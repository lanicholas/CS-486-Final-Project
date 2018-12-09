# CS 486 Final Project
## By: Lillian Nicholas

### Description
For my CS486 final project, I chose to manually model a robot. The modeling heirarchy of my model has a depth of four and my model includes the following primitives: boxes, spheres, and cylinders. My project includes a GUI, which allows the viewer to ajdust the lighting of the scene and the position the robot is in. The viewer has the option the adjust the ambient and point light intensity as well as the y rotation of the neck and the x and z rotation of the left and right shoulders, elbows, wrists, hips, knees, and ankles. In my project, I also included shadows on the floor of the scene derived from a directional light source and an animated particle system, which is the background of the scene.

### Sources
#### Source 1 from threejs.org/examples: Animated Robot Model
[Link to view Animated Robot Model example](https://threejs.org/examples/#webgl_animation_skinning_morph)

[Link to code for Animated Robot Model example](https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_morph.html)

#### Source 2 from threejs.org/examples: Lighting and Shadows
[Link to view Lighting and Shadows example ](https://threejs.org/examples/#webgl_lights_hemisphere)

[Link to code for Lighting and Shadows example](https://github.com/mrdoob/three.js/blob/master/examples/webgl_lights_hemisphere.html)

#### Source 3 from threejs.org/examples: Simple Particle System
[Link to view Simple Particle System example](https://threejs.org/examples/?q=par#webgl_buffergeometry_custom_attributes_particles)

[Link to code for Simple Particle System example](https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_custom_attributes_particles.html)

### Implementation
To implement my project, I referenced the code from labs 4 and 5 and the code from the three.js examples listed above. First, I set up the renderer, camera, scene, and ambient and point lighting by referencing the code from labs 4 and 5. Also, I added GUI controls, which allow the viewer to change the intensity of the ambient and point lights. Next, I added the ground and the grid to the scene using the following small piece of code from source 1. 

```
var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
mesh.rotation.x = - Math.PI / 2;
scene.add( mesh );
var grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add( grid );
```
Then, I created the model of the robot using the primitives I listed above and by grouping the primitives together to create a modeling heirarchy. The entire model is contained in the body group. The body group has five group added to it and they are the neck, left shoulder, right shoulder, left leg, and right leg groups. Both of the shoulder groups contain an elbow group, and each of the elbow groups contain a wrist group. Both of the leg groups contain a knee group, and each of the knee groups conatin an ankle group. After I created the model, I added additional GUI controls, which allow the viewer to adjust the y rotation of the neck and the x and z rotation of the left and right shoulders, elbows, wrists, hips, knees, and ankles. With these controls, the viewer can put the robot into any position they like. Next, I added a hemisphere and directional light to the scene in order to create shadows. To do this, I used the following piece of code from source 2. 

```
hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );

dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

var d = 50;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;
```
However, I altered the color and position of both of these lights in order to get the effect I desired. Also, I set the castShadow property for each primitve to true and the recieveShadow property for the ground to true, which allowed the shadow to render. 

### Result
#### Image of Initial Rendering 
![Image of Initial Rendering](https://lanicholas-loyola.tinytake.com/media/8fef39?filename=1544373202999_09-12-2018-11-33-21.png&sub_type=thumbnail_preview&type=attachment&width=1199&height=564)

#### Video of Animation and using GUI
[![Video of Animation and Using GUI](http://img.youtube.com/vi/vscoPHECUnk&feature=youtu.be/0.jpg)](https://www.youtube.com/watch?v=vscoPHECUnk&feature=youtu.be)
