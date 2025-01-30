import React from 'react'
import SketchfabViewer from '../components/canvas/SketchfabViewer'

// const MODEL_UID = "dd958716be0b4786b8700125eec618e5";
// // const MODEL_UID = "c632823b6c204797bd9b95dbd9f53a06";
// // const MODEL_UID = "d75f531255ad47a99051a4c421c8861b";

// const Viewer = ({ apiRef, sketchfabUrl }: any) => {
const page = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ textAlign: 'center'}}>
            <h1>Lab Maya Research AR Playground</h1>
            
            <p>
                Viewer API: <a target='_blank' href="https://sketchfab.com/developers/viewer/initialization"> Click Here</a>
            </p>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ width: '50%' }}>
                <SketchfabViewer sketchfabUrl="dd958716be0b4786b8700125eec618e5" />
            </div>
            <div style={{ width: '50%' }}>
                <h2>Sketchfab Premium</h2>
                <p>
                    Sketchfab Premium does not allow the removal of certain built-in assets from Sketchfab. Even if they are set to "hide," they will still appear, meaning some Sketchfab-related  information remains visible. However, we can add annotations to provide additional information within the 3D model.
                </p>
                <pre>
                    <code>
                        <div>{`client.init(sketchfabUrl, {`}</div>
                        <div>{`  ui_controls: 0,`}</div>
                        <div>{`  ui_watermark: 0,`}</div>
                        <div>{`  ui_start: 0,`}</div>
                        <div>{`  ui_settings: 0,`}</div>
                        <div>{`  ui_infos: 0,`}</div>
                        <div>{`  ui_stop: 0,`}</div>
                        <div>{`  success: function onSuccess( api: any ){`}</div>
                        <div>{`    setApi(api);`}</div>
                        <div>{`    api.start();`}</div>
                        <div>{`    api.addEventListener( 'viewerready', function() {`}</div>
                        <div>{`        console.log( 'Viewer is ready' );`}</div>
                        <div>{`    } );`}</div>
                        <div>{`},`}</div>
                        <div>{`  error: () => {`}</div>
                        <div>{`    console.log("Viewer error");`}</div>
                        <div>{`  },`}</div>
                        <div>{`});`}</div>
                    </code>
                </pre>
            </div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ width: '50%' }}>
                <h2>Sketchfab Free Content</h2>
                <p>
                    With the free version of Sketchfab, we can configure the Viewer API to display the 3D object without showing any Sketchfab-related information.
                </p>
                <pre>
                    <code>
                        <div>{`client.init(sketchfabUrl, {`}</div>
                        <div>{`  ui_controls: 0,`}</div>
                        <div>{`  ui_watermark: 0,`}</div>
                        <div>{`  ui_start: 0,`}</div>
                        <div>{`  ui_settings: 0,`}</div>
                        <div>{`  ui_infos: 0,`}</div>
                        <div>{`  ui_stop: 0,`}</div>
                        <div>{`  success: function onSuccess( api: any ){`}</div>
                        <div>{`    setApi(api);`}</div>
                        <div>{`    api.start();`}</div>
                        <div>{`    api.addEventListener( 'viewerready', function() {`}</div>
                        <div>{`        console.log( 'Viewer is ready' );`}</div>
                        <div>{`    } );`}</div>
                        <div>{`},`}</div>
                        <div>{`  error: () => {`}</div>
                        <div>{`    console.log("Viewer error");`}</div>
                        <div>{`  },`}</div>
                        <div>{`});`}</div>
                    </code>
                </pre>
            </div>
            <div style={{ width: '50%' }}>
                <SketchfabViewer sketchfabUrl="d75f531255ad47a99051a4c421c8861b" />
            </div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ width: '50%' }}>
                <SketchfabViewer sketchfabUrl="35da9d322cbe406bbf7faf38307a20c2" />
            </div>
            <div style={{ width: '50%' }}>
                <h2>Another Sketchfab</h2>
                <p>
                    This is another Sketchfab model that can be used as a reference for educational purposes.
                </p>
                <pre>
                    <code>
                        <div>{`client.init(sketchfabUrl, {`}</div>
                        <div>{`  ui_controls: 0,`}</div>
                        <div>{`  ui_watermark: 0,`}</div>
                        <div>{`  ui_start: 0,`}</div>
                        <div>{`  ui_settings: 0,`}</div>
                        <div>{`  ui_infos: 0,`}</div>
                        <div>{`  ui_stop: 0,`}</div>
                        <div>{`  success: function onSuccess( api: any ){`}</div>
                        <div>{`    setApi(api);`}</div>
                        <div>{`    api.start();`}</div>
                        <div>{`    api.addEventListener( 'viewerready', function() {`}</div>
                        <div>{`        console.log( 'Viewer is ready' );`}</div>
                        <div>{`    } );`}</div>
                        <div>{`},`}</div>
                        <div>{`  error: () => {`}</div>
                        <div>{`    console.log("Viewer error");`}</div>
                        <div>{`  },`}</div>
                        <div>{`});`}</div>
                    </code>
                </pre>
            </div>
        </div>
    </div>
  )
}

export default page