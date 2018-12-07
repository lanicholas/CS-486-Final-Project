// Lillian Nicholas
// CS 486 Final Project

if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

// initialize variables
var renderer, scene, camera, stats;
var particleSystem, uniforms, geometry;
var particles = 100000;

// sets up the scene
init();

// animates the scene
animate();


// purpose: set up the scene
function init() {
  // set up camera and scene
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
  camera.position.set( 0, 3, 15 );
  camera.lookAt( new THREE.Vector3( 0, 4, 0 ) );
  scene = new THREE.Scene();


 // set up lighting
  var light_ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(light_ambient);
  var light_point = new THREE.PointLight(0xffffff, 0.4);
  light_point.position.set(camera.position.x, camera.position.y, camera.position.z);
  scene.add(light_point);

  var light_hemi = new THREE.HemisphereLight( 0xffffff, 0.6 );
  light_hemi.position.set( 0, 20, 0 );
  light_hemi.color.setRGB( .3, .3, .3 );
  light_hemi.groundColor.setHSL( 1, 1, 1 );
  scene.add( light_hemi );


  light_dir = new THREE.DirectionalLight( 0xffffff );
  light_dir.position.set( 0, 10, 10 );
  light_dir.color.setHSL( 1, 1, 1);
  light_dir.position.multiplyScalar( 30 );
  scene.add( light_dir );

  light_dir.castShadow = true;
  light_dir.shadow.mapSize.width = 2048;
  light_dir.shadow.mapSize.height = 2048;

  var d = 90;
  light_dir.shadow.camera.left = -d;
  light_dir.shadow.camera.right = d;
  light_dir.shadow.camera.top = d;
  light_dir.shadow.camera.bottom = -d;
  light_dir.shadow.camera.far = 3500;
  light_dir.shadow.bias =  -0.0001;


  // set up particle system in background
  unis = {
    texture: { value: new THREE.TextureLoader().load( "spark1.png" ) }
  };

  var shaderMaterial = new THREE.ShaderMaterial( {
    uniforms: unis,
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: false,
    vertexColors: true
  } );

  var radius = 200;
  geometry = new THREE.BufferGeometry();
  var positions = [];
  var colors = [];
  var sizes = [];
  var color = new THREE.Color();

  for ( var i = 0; i < particles; i ++ ) {
    positions.push( ( Math.random() * 2 - 1 ) * radius );
    positions.push( ( Math.random() * 2 - 1 ) * radius );
    positions.push( ( Math.random() * 2 - 1 ) * radius );
    color.setHSL( i / particles, 1.0, 0.5 );
    colors.push( color.r, color.g, color.b );
    sizes.push( 20 );
  }

  geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
  geometry.addAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setDynamic( true ) );
  particleSystem = new THREE.Points( geometry, shaderMaterial );
  scene.add( particleSystem );


  // set up robot model
  // set up neck group
  var neck_geometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 4);
  var neck_material = new THREE.MeshPhongMaterial();
  neck_material.color = new THREE.Color("blue");
  var neck_mesh = new THREE.Mesh(neck_geometry, neck_material);
  neck_mesh.castShadow = true

  var neck_group = new THREE.Group();
  neck_group.add(neck_mesh);
  neck_group.position.y = 4.1;


  var head_geometry = new THREE.BoxGeometry(1, 1, 1);
  var head_material = new THREE.MeshPhongMaterial();
  head_material.color = new THREE.Color("blue");
  var head_mesh = new THREE.Mesh(head_geometry, head_material);
  head_mesh.castShadow = true;

  neck_group.add(head_mesh);
  head_mesh.position.y = 0.7;


  var left_eye_geometry = new THREE.SphereGeometry(0.15, 8, 4);
  var left_eye_material = new THREE.MeshPhongMaterial();
  left_eye_material.color = new THREE.Color("red");
  var left_eye_mesh = new THREE.Mesh(left_eye_geometry, left_eye_material);
  left_eye_mesh.castShadow = true;

  neck_group.add(left_eye_mesh);
  left_eye_mesh.position.y = 0.8;
  left_eye_mesh.position.x = -0.3;
  left_eye_mesh.position.z = 0.5;


  var right_eye_geometry = new THREE.SphereGeometry(0.15, 8, 4);
  var right_eye_material = new THREE.MeshPhongMaterial();
  right_eye_material.color = new THREE.Color("red");
  var right_eye_mesh = new THREE.Mesh(right_eye_geometry, right_eye_material);
  right_eye_mesh.castShadow = true;

  neck_group.add(right_eye_mesh);
  right_eye_mesh.position.y = 0.8;
  right_eye_mesh.position.x = 0.3;
  right_eye_mesh.position.z = 0.5;


  // set up shoulder groups
  var left_shoulder_geometry = new THREE.SphereGeometry(0.15, 8, 4);
  var left_shoulder_material = new THREE.MeshPhongMaterial();
  left_shoulder_material.color = new THREE.Color("blue");
  var left_shoulder_mesh = new THREE.Mesh(left_shoulder_geometry, left_shoulder_material);
  left_shoulder_mesh.castShadow = true;

  var left_shoulder_group = new THREE.Group();
  left_shoulder_group.add(left_shoulder_mesh);
  left_shoulder_group.position.y = 3.85;
  left_shoulder_group.position.x = -0.6;


  var right_shoulder_geometry = new THREE.SphereGeometry(0.15, 8, 4);
  var right_shoulder_material = new THREE.MeshPhongMaterial();
  right_shoulder_material.color = new THREE.Color("blue");
  var right_shoulder_mesh = new THREE.Mesh(right_shoulder_geometry, right_shoulder_material);
  right_shoulder_mesh.castShadow = true;

  var right_shoulder_group = new THREE.Group();
  right_shoulder_group.add(right_shoulder_mesh);
  right_shoulder_group.position.y = 3.85;
  right_shoulder_group.position.x = 0.6;


  var left_upper_arm_geometry = new THREE.BoxGeometry(0.25, 0.4, 0.25);
  var left_upper_arm_material = new THREE.MeshPhongMaterial();
  left_upper_arm_material.color = new THREE.Color("blue");
  var left_upper_arm_mesh = new THREE.Mesh(left_upper_arm_geometry, left_upper_arm_material);
  left_upper_arm_mesh.castShadow = true;

  left_shoulder_group.add(left_upper_arm_mesh);
  left_upper_arm_mesh.position.y = -0.25;
  left_upper_arm_mesh.position.x = -0.17;
  left_upper_arm_mesh.rotation.z = -Math.PI / 5;


  var right_upper_arm_geometry = new THREE.BoxGeometry(0.25, 0.4, 0.25);
  var right_upper_arm_material = new THREE.MeshPhongMaterial();
  right_upper_arm_material.color = new THREE.Color("blue");
  var right_upper_arm_mesh = new THREE.Mesh(right_upper_arm_geometry, right_upper_arm_material);
  right_upper_arm_mesh.castShadow = true;

  right_shoulder_group.add(right_upper_arm_mesh);
  right_upper_arm_mesh.position.y = -0.25;
  right_upper_arm_mesh.position.x = 0.17;
  right_upper_arm_mesh.rotation.z = Math.PI / 5;


  // set up elbow groups
  var left_elbow_geometry = new THREE.SphereGeometry(0.12, 8, 4);
  var left_elbow_material = new THREE.MeshPhongMaterial();
  left_elbow_material.color = new THREE.Color("blue");
  var left_elbow_mesh = new THREE.Mesh(left_elbow_geometry, left_elbow_material);
  left_elbow_mesh.castShadow = true;

  var left_elbow_group = new THREE.Group();
  left_elbow_group.add(left_elbow_mesh);
  left_elbow_group.position.y = -0.48;
  left_elbow_group.position.x = -0.32;


  var right_elbow_geometry = new THREE.SphereGeometry(0.12, 8, 4);
  var right_elbow_material = new THREE.MeshPhongMaterial();
  right_elbow_material.color = new THREE.Color("blue");
  var right_elbow_mesh = new THREE.Mesh(right_elbow_geometry, right_elbow_material);
  right_elbow_mesh.castShadow = true;

  var right_elbow_group = new THREE.Group();
  right_elbow_group.add(right_elbow_mesh);
  right_elbow_group.position.y = -0.48;
  right_elbow_group.position.x = 0.32;


  var left_lower_arm_geometry = new THREE.BoxGeometry(0.2, 0.55, 0.2);
  var left_lower_arm_material = new THREE.MeshPhongMaterial();
  left_lower_arm_material.color = new THREE.Color("blue");
  var left_lower_arm_mesh = new THREE.Mesh(left_lower_arm_geometry, left_lower_arm_material);
  left_lower_arm_mesh.castShadow = true;

  left_elbow_group.add(left_lower_arm_mesh);
  left_lower_arm_mesh.position.y = -0.34;
  left_lower_arm_mesh.position.x = -0.02;


  var right_lower_arm_geometry = new THREE.BoxGeometry(0.2, 0.55, 0.2);
  var right_lower_arm_material = new THREE.MeshPhongMaterial();
  right_lower_arm_material.color = new THREE.Color("blue");
  var right_lower_arm_mesh = new THREE.Mesh(right_lower_arm_geometry, right_lower_arm_material);
  right_lower_arm_mesh.castShadow = true;

  right_elbow_group.add(right_lower_arm_mesh);
  right_lower_arm_mesh.position.y = -0.34;
  right_lower_arm_mesh.position.x = 0.02;


  // set up wrist groups
  var left_wrist_geometry = new THREE.SphereGeometry(0.1, 8, 4);
  var left_wrist_material = new THREE.MeshPhongMaterial();
  left_wrist_material.color = new THREE.Color("blue");
  var left_wrist_mesh = new THREE.Mesh(left_wrist_geometry, left_wrist_material);
  left_wrist_mesh.castShadow = true;

  var left_wrist_group = new THREE.Group();
  left_wrist_group.add(left_wrist_mesh);
  left_wrist_group.position.y = -0.68;
  left_wrist_group.position.x = -0.02;


  var right_wrist_geometry = new THREE.SphereGeometry(0.1, 8, 4);
  var right_wrist_material = new THREE.MeshPhongMaterial();
  right_wrist_material.color = new THREE.Color("blue");
  var right_wrist_mesh = new THREE.Mesh(right_wrist_geometry, right_wrist_material);
  right_wrist_mesh.castShadow = true;

  var right_wrist_group = new THREE.Group();
  right_wrist_group.add(right_wrist_mesh);
  right_wrist_group.position.y = -0.68;
  right_wrist_group.position.x = 0.02;


  var left_hand_geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  var left_hand_material = new THREE.MeshPhongMaterial();
  left_hand_material.color = new THREE.Color("red");
  var left_hand_mesh = new THREE.Mesh(left_hand_geometry, left_hand_material);
  left_hand_mesh.castShadow = true;

  left_wrist_group.add(left_hand_mesh);
  left_hand_mesh.position.y = -0.2;
  left_hand_mesh.position.x = 0;


  var right_hand_geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  var right_hand_material = new THREE.MeshPhongMaterial();
  right_hand_material.color = new THREE.Color("red");
  var right_hand_mesh = new THREE.Mesh(right_hand_geometry, right_hand_material);
  right_hand_mesh.castShadow = true;

  right_wrist_group.add(right_hand_mesh);
  right_hand_mesh.position.y = -0.2;
  right_hand_mesh.position.x = 0;


  // set up body group
  var body_geometry = new THREE.BoxGeometry(1, 2.2, 1);
  var body_material = new THREE.MeshPhongMaterial();
  body_material.color = new THREE.Color("blue");
  var body_mesh = new THREE.Mesh(body_geometry, body_material);
  body_mesh.position.y = 3;
  body_mesh.castShadow = true;

  var body_group = new THREE.Group();
  body_group.add(body_mesh);


  // set up hip/leg groups
  var left_hip_geometry = new THREE.SphereGeometry(0.15, 8, 4);
  var left_hip_material = new THREE.MeshPhongMaterial();
  left_hip_material.color = new THREE.Color("blue");
  var left_hip_mesh = new THREE.Mesh(left_hip_geometry, left_hip_material);
  left_hip_mesh.castShadow = true;

  var left_leg_group = new THREE.Group();
  left_leg_group.add(left_hip_mesh);
  left_leg_group.position.y = 1.81;
  left_leg_group.position.x = -0.35;


  var right_hip_geometry = new THREE.SphereGeometry(0.15, 8, 4);
  var right_hip_material = new THREE.MeshPhongMaterial();
  right_hip_material.color = new THREE.Color("blue");
  var right_hip_mesh = new THREE.Mesh(right_hip_geometry, right_hip_material);
  right_hip_mesh.castShadow = true;

  var right_leg_group = new THREE.Group();
  right_leg_group.add(right_hip_mesh);
  right_leg_group.position.y = 1.81;
  right_leg_group.position.x = 0.35;


  var left_upper_leg_geometry = new THREE.BoxGeometry(0.25, 0.55, 0.25);
  var left_upper_leg_material = new THREE.MeshPhongMaterial();
  left_upper_leg_material.color = new THREE.Color("blue");
  var left_upper_leg_mesh = new THREE.Mesh(left_upper_leg_geometry, left_upper_leg_material);
  left_upper_leg_mesh.castShadow = true;

  left_leg_group.add(left_upper_leg_mesh);
  left_upper_leg_mesh.position.y = -0.39;
  left_upper_leg_mesh.position.x = 0;


  var right_upper_leg_geometry = new THREE.BoxGeometry(0.25, 0.55, 0.25);
  var right_upper_leg_material = new THREE.MeshPhongMaterial();
  right_upper_leg_material.color = new THREE.Color("blue");
  var right_upper_leg_mesh = new THREE.Mesh(right_upper_leg_geometry, right_upper_leg_material);
  right_upper_leg_mesh.castShadow = true;

  right_leg_group.add(right_upper_leg_mesh);
  right_upper_leg_mesh.position.y = -0.39;
  right_upper_leg_mesh.position.x = 0;


  // set up knee groups
  var left_knee_geometry = new THREE.SphereGeometry(0.12, 8, 4);
  var left_knee_material = new THREE.MeshPhongMaterial();
  left_knee_material.color = new THREE.Color("blue");
  var left_knee_mesh = new THREE.Mesh(left_knee_geometry, left_knee_material);
  left_knee_mesh.castShadow = true;

  var left_knee_group = new THREE.Group();
  left_knee_group.add(left_knee_mesh);
  left_knee_group.position.y = -0.75;
  left_knee_group.position.x = 0;


  var right_knee_geometry = new THREE.SphereGeometry(0.12, 8, 4);
  var right_knee_material = new THREE.MeshPhongMaterial();
  right_knee_material.color = new THREE.Color("blue");
  var right_knee_mesh = new THREE.Mesh(right_knee_geometry, right_knee_material);
  right_knee_mesh.castShadow = true;

  var right_knee_group = new THREE.Group();
  right_knee_group.add(right_knee_mesh);
  right_knee_group.position.y = -0.75;
  right_knee_group.position.x = 0;


  var left_lower_leg_geometry = new THREE.BoxGeometry(0.23, 0.55, 0.23);
  var left_lower_leg_material = new THREE.MeshPhongMaterial();
  left_lower_leg_material.color = new THREE.Color("blue");
  var left_lower_leg_mesh = new THREE.Mesh(left_lower_leg_geometry, left_lower_leg_material);
  left_lower_leg_mesh.castShadow = true;

  left_knee_group.add(left_lower_leg_mesh);
  left_lower_leg_mesh.position.y = -0.36;
  left_lower_leg_mesh.position.x = 0;


  var right_lower_leg_geometry = new THREE.BoxGeometry(0.23, 0.55, 0.23);
  var right_lower_leg_material = new THREE.MeshPhongMaterial();
  right_lower_leg_material.color = new THREE.Color("blue");
  var right_lower_leg_mesh = new THREE.Mesh(right_lower_leg_geometry, right_lower_leg_material);
  right_lower_leg_mesh.castShadow = true;

  right_knee_group.add(right_lower_leg_mesh);
  right_lower_leg_mesh.position.y = -0.36;
  right_lower_leg_mesh.position.x = 0;


  // set up ankle groups
  var left_ankle_geometry = new THREE.SphereGeometry(0.1, 8, 4);
  var left_ankle_material = new THREE.MeshPhongMaterial();
  left_ankle_material.color = new THREE.Color("blue");
  var left_ankle_mesh = new THREE.Mesh(left_ankle_geometry, left_ankle_material);
  left_ankle_mesh.castShadow = true;

  var left_ankle_group = new THREE.Group();
  left_ankle_group.add(left_ankle_mesh);
  left_ankle_group.position.y = -0.7;
  left_ankle_group.position.x = 0;


  var right_ankle_geometry = new THREE.SphereGeometry(0.1, 8, 4);
  var right_ankle_material = new THREE.MeshPhongMaterial();
  right_ankle_material.color = new THREE.Color("blue");
  var right_ankle_mesh = new THREE.Mesh(right_ankle_geometry, right_ankle_material);
  right_ankle_mesh.castShadow = true;

  var right_ankle_group = new THREE.Group();
  right_ankle_group.add(right_ankle_mesh);
  right_ankle_group.position.y = -0.7;
  right_ankle_group.position.x = 0;


  var left_foot_geometry = new THREE.BoxGeometry(0.33, 0.33, 0.75);
  var left_foot_material = new THREE.MeshPhongMaterial();
  left_foot_material.color = new THREE.Color("red");
  var left_foot_mesh = new THREE.Mesh(left_foot_geometry, left_foot_material);
  left_foot_mesh.castShadow = true;

  left_ankle_group.add(left_foot_mesh);
  left_foot_mesh.position.z = 0.2;
  left_foot_mesh.position.y = -0.21;
  left_foot_mesh.position.x = 0;


  var right_foot_geometry = new THREE.BoxGeometry(0.33, 0.33, 0.75);
  var right_foot_material = new THREE.MeshPhongMaterial();
  right_foot_material.color = new THREE.Color("red");
  var right_foot_mesh = new THREE.Mesh(right_foot_geometry, right_foot_material);
  right_eye_mesh.castShadow = true;

  right_ankle_group.add(right_foot_mesh);
  right_foot_mesh.position.z = 0.2;
  right_foot_mesh.position.y = -0.21;
  right_foot_mesh.position.x = 0;


  // add arm groups to body group
  left_elbow_group.add(left_wrist_group);
  right_elbow_group.add(right_wrist_group);
  left_shoulder_group.add(left_elbow_group);
  right_shoulder_group.add(right_elbow_group);
  body_group.add(left_shoulder_group);
  body_group.add(right_shoulder_group);

  // add leg groups to body group
  left_knee_group.add(left_ankle_group);
  right_knee_group.add(right_ankle_group);
  left_leg_group.add(left_knee_group);
  right_leg_group.add(right_knee_group);
  body_group.add(left_leg_group);
  body_group.add(right_leg_group);

  // add neck group to body group
  body_group.add(neck_group);

  // add the model to the scene
  scene.add(body_group);


  // set up ground
  var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
  var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
  groundMat.color.setHSL( 1, 1, 1 );
  var ground = new THREE.Mesh( groundGeo, groundMat );
  ground.rotation.x = - Math.PI / 2;
  ground.position.y = - 33;
  scene.add( ground );
  ground.receiveShadow = true;


  // set up gui sliders
  var gui = new dat.GUI();
  gui.width = 400;
  var h;

  h = gui.addFolder("Lighting");
  h.add(light_ambient, "intensity", 0.0, 1.0, 0.1).name("Ambient Light Intensity");
  h.add(light_point,   "intensity", 0.0, 1.0, 0.1).name("Point Light Intensity");

  h = gui.addFolder("Neck Parameters");
  h.add(neck_group.rotation, "y", -Math.PI/1.5, Math.PI/1.5, 2*Math.PI/32).name("Neck Y Rotation");

  h = gui.addFolder("Shoulder Parameters");
  h.add(left_shoulder_group.rotation, "x", -Math.PI, Math.PI/1.5, 2*Math.PI/32).name("Left Shoulder X Rotation");
  h.add(left_shoulder_group.rotation, "z", -Math.PI/1.5, Math.PI/12, 2*Math.PI/32).name("Left Shoulder Z Rotation");
  h.add(right_shoulder_group.rotation, "x", -Math.PI, Math.PI/1.5, 2*Math.PI/32).name("Right Shoulder X Rotation");
  h.add(right_shoulder_group.rotation, "z", -Math.PI/12, Math.PI/1.5, 2*Math.PI/32).name("Right Shoulder Z Rotation");

  h = gui.addFolder("Elbow Parameters");
  h.add(left_elbow_group.rotation, "x", -Math.PI/1.2, 0.0, 2*Math.PI/32).name("Left Elbow X Rotation");
  h.add(left_elbow_group.rotation, "z", -Math.PI/1.2, 0.0, 2*Math.PI/32).name("Left Elbow Z Rotation");
  h.add(right_elbow_group.rotation, "x", -Math.PI/1.2, 0.0, 2*Math.PI/32).name("Right Elbow X Rotation");
  h.add(right_elbow_group.rotation, "z", 0.0, Math.PI/1.2, 2*Math.PI/32).name("Right Elbow Z Rotation");

  h = gui.addFolder("Wrist Parameters");
  h.add(left_wrist_group.rotation, "x", -Math.PI/2, Math.PI/2, 2*Math.PI/32).name("Left Wrist X Rotation");
  h.add(left_wrist_group.rotation, "z", -Math.PI/3, Math.PI/3, 2*Math.PI/32).name("Left Wrist Z Rotation");
  h.add(right_wrist_group.rotation, "x", -Math.PI/2, Math.PI/2, 2*Math.PI/32).name("Right Wrist X Rotation");
  h.add(right_wrist_group.rotation, "z", -Math.PI/3, Math.PI/3, 2*Math.PI/32).name("Right Wrist Z Rotation");

  h = gui.addFolder("Hip Parameters");
  h.add(left_leg_group.rotation, "x", -Math.PI/2.2, Math.PI/2.2, 2*Math.PI/32).name("Left Hip X Rotation");
  h.add(left_leg_group.rotation, "z", -Math.PI/2.5, Math.PI/16, 2*Math.PI/32).name("Left Hip Z Rotation");
  h.add(right_leg_group.rotation, "x", -Math.PI/2.2, Math.PI/2.2, 2*Math.PI/32).name("Right Hip X Rotation");
  h.add(right_leg_group.rotation, "z", -Math.PI/16, Math.PI/2.5, 2*Math.PI/32).name("Right Hip Z Rotation");

  h = gui.addFolder("Knee Parameters");
  h.add(left_knee_group.rotation, "x", 0.0, Math.PI/1.5, 2*Math.PI/32).name("Left Knee X Rotation");
  h.add(left_knee_group.rotation, "z", -Math.PI/8, Math.PI/1.5, 2*Math.PI/32).name("Left Knee Z Rotation");
  h.add(right_knee_group.rotation, "x", 0.0, Math.PI/1.5, 2*Math.PI/32).name("Right Knee X Rotation");
  h.add(right_knee_group.rotation, "z", -Math.PI/1.5, Math.PI/8, 2*Math.PI/32).name("Right Knee Z Rotation");

  h = gui.addFolder("Ankle Parameters");
  h.add(left_ankle_group.rotation, "x", -Math.PI/4, Math.PI/2, 2*Math.PI/32).name("Left Ankle X Rotation");
  h.add(left_ankle_group.rotation, "z", -Math.PI/3, Math.PI/3, 2*Math.PI/32).name("Left Ankle Z Rotation");
  h.add(right_ankle_group.rotation, "x", -Math.PI/4, Math.PI/2, 2*Math.PI/32).name("Right Ankle X Rotation");
  h.add(right_ankle_group.rotation, "z", -Math.PI/3, Math.PI/3, 2*Math.PI/32).name("Right Ankle Z Rotation");

  // set up mesh and grid
  var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
  mesh.rotation.x = - Math.PI / 2;
  scene.add( mesh );
  mesh.receiveShadow = true;
  var grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add( grid );

  // set up renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // set up contols and add renderer to scene
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  var container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );
  stats = new Stats();
  container.appendChild( stats.dom );
  window.addEventListener( 'resize', onWindowResize, false );
}

// purpose: rerender the scene when the window is resized
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// purpose: animates the particle system
function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}

// purpose: change the size of the particles and the rotation of the particle system
function render() {
  var time = Date.now() * 0.005;
  particleSystem.rotation.z = 0.01 * time;
  var sizes = geometry.attributes.size.array;
  for ( var i = 0; i < particles; i ++ ) {
    sizes[ i ] = 10 * ( 1 + Math.sin( 0.1 * i + time ) );
  }
  geometry.attributes.size.needsUpdate = true;
  renderer.render( scene, camera );
}
