import React from 'react';
import * as THREE from 'three-full';
import PropTypes from 'prop-types';

/**
 props:
 1. selfDomId
 2. renderSize
 *3. sceneBgc
 *4. filePath
 5. filecolor
 9. filePositionX
*/
export default class StlViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    // this.mesh = {
    //   rotation: {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   },
    // }
  }

  componentDidMount() {
    const { filePath } = this.props;
    this.drawStl(filePath);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filePath !== this.props.filePath) {
      this.setState({ loading: true })
      this.drawStl(nextProps.filePath);
    }
  }

  drawStl = (filePath) => {
    const self = this;
    const { selfDomId, renderSize = 0 } = this.props;
    const container = document.getElementById(selfDomId);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias:true });
    const camera = new THREE.PerspectiveCamera(35, renderSize / renderSize, 0.1, 1000);
    let mesh = {
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    }

    camera.position.set(3, 0.15, 3);
    scene.background = new THREE.Color(0xffffff);
    scene.add(new THREE.HemisphereLight(0x9e9e9e, 0x616161)); // prop?
    this.addShadowedLight(scene, 0, 0, 5, '#616161', 1); // prop?
    this.addShadowedLight(scene, 0, 0, -5, '#616161', 1); // prop?
    // // scene.add(new THREE.AmbientLight(0xeeeeee, 1));
    renderer.setSize(renderSize, renderSize);

    const cCanvas = renderer.getContext().canvas;
    cCanvas.setAttribute("style", cCanvas.getAttribute("style") + 'border-radius: 25px;cursor: pointer;');
    container.appendChild(renderer.domElement);

    // // a common scale needed for thousands of files with diff sizes???
    // // or calculate scale based on each file size???
    // this.loadStl(scene, filePath, 0.005, 0.005, 0.005, 0);
    // binary file
    const loader = new THREE.STLLoader();
    loader.load(filePath, (geometry) => {
      const material = new THREE.MeshPhongMaterial({
        // color: '#ff7c40', // prop?
        // specular: '#bdbdbd',
        // shininess: 200,
        // flatShading: true,
      });
      geometry.center();
      mesh = new THREE.Mesh(geometry, material);
      // mesh.position.set(positionX, 0, 0);
      // mesh.scale.set(scaleX, scaleY, scaleZ);
      mesh.scale.set(0.005, 0.005, 0.005);
      const axes = new THREE.AxesHelper(2000);
      axes.material.depthTest = false;
      axes.renderOrder = 1;
      mesh.add(axes);
      scene.add(mesh);
      this.setState({ loading: false })
    })

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 1000;
    window.addEventListener('resize', this.onWindowResize(camera, renderer), false);
    function animate(){
      requestAnimationFrame(animate);
      controls.update();
      // mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      // mesh.rotation.z += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }

  loadStl = (scene, path, scaleX, scaleY, scaleZ, positionX) => {
    // binary file
    const loader = new THREE.STLLoader();
    loader.load(path, (geometry) => {
      const material = new THREE.MeshPhongMaterial({
        // color: '#ff7c40', // prop?
        // specular: '#bdbdbd',
        // shininess: 200,
        // flatShading: true,
      });
      geometry.center();
      this.mesh = new THREE.Mesh(geometry, material);
      // this.mesh.position.set(positionX, 0, 0);
      this.mesh.scale.set(scaleX, scaleY, scaleZ);
      const axes = new THREE.AxesHelper(2000);
      axes.material.depthTest = false;
      axes.renderOrder = 1;
      this.mesh.add(axes);
      scene.add(this.mesh);
      this.setState({ loading: false })
    })
  }

  onWindowResize = (camera, renderer) => {
    const { renderSize } = this.props;
    camera.aspect = renderSize / renderSize;
    camera.updateProjectionMatrix();
    renderer.setSize(renderSize, renderSize);
  }

  addShadowedLight = (scene, x, y, z, color, intensity) => {
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight)
  }
   
  render(){
    const{ loading }=this.state;
    const{ selfDomId, renderSize }=this.props

    return (
      <div
        id={selfDomId}
        style={{
          width: renderSize,
          height: renderSize,
          position: 'relative',
          display: 'inline-block',
          margin: 10, 
        }}>
        {
          loading
            && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '42%',
                  display: 'inline-block',
                }}
              >
                Loading...
              </div>
            )
        }
      </div>
    )
  }
}

StlViewer.propTypes = {
  filePath: PropTypes.string,
  selfDomId: PropTypes.string.isRequired,
  renderSize: PropTypes.number,
}

StlViewer.defaultProps = {
  filePath: '',
  renderSize: 300,
}