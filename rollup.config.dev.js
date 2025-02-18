import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { eslint } from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import globals from 'rollup-plugin-node-globals';
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
"rtcjs/videochat-module-webrtc/lib"
const appPlugin = [
  copy({
    targets: [
      { src: 'rtcjs/videochat-module-webrtc/lib/WebRTCVideoChatModule.js', dest: 'rtcjs/rtc-demo/public/videochat-module-webrtc' },
      { src: 'rtcjs/videochat-controller-webrtc/lib/index.js', dest: 'rtcjs/rtc-demo/public/videochat-controller-webrtc' },
      { src: 'rtcjs/videochat-displayer/lib/index.js', dest: 'rtcjs/rtc-demo/public/videochat-displayer' },
      { src: 'rtcjs/videochat-control-displayer/lib/index.js', dest: 'rtcjs/rtc-demo/public/videochat-control-displayer' },
      { src: 'rtcjs/@rtcjs-webrtc-signaling/src/WebRTCSignaling.js', dest: 'rtcjs/rtc-demo/public/rtcjs-webrtc-signaling' },

      { src: 'rtcjs/shareables-webrtc/lib/closeCall.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/createAnswer.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/createOffer.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/destroyRTC.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/initialState.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/rtcStateUpdate.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/servers.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/useDataChannel.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },
      { src: 'rtcjs/shareables-webrtc/lib/useMediaStream.js', dest: 'rtcjs/rtc-demo/public/shareables-webrtc' },

      { src: 'rtcjs/rtc-demo/server/index.js', dest: 'rtcjs/rtc-demo/public/server' },
      { src: 'rtcjs/@rtcjs-server/index.js', dest: 'rtcjs/rtc-demo/public/rtcjs-server' },
      { src: 'rtcjs/@rtcjs-server-webrtc-signaling/index.js', dest: 'rtcjs/rtc-demo/public/rtcjs-server-webrtc-signaling' },

      { src: 'rtcjs/@rtcjs-server-peer-text-chat/index.js', dest: 'rtcjs/rtc-demo/public/rtcjs-server-peer-text-chat' },
    ]
  }),
  postcss({
    plugins: []
  }),
  resolve({
    browser: true,
    extensions: ['.js', '.jsx', '.json'],
  }),

  commonjs({
    include: ['node_modules/**'],
    exclude: ['node_modules/process-es6/**'],
    namedExports: {
      'node_modules/react/index.js': [
        'Children',
        'Component',
        'createElement',
        'isValidElement',
        'cloneElement'
      ],
      'node_modules/react-is/index.js': ['isValidElementType'],
      'node_modules/prop-types/index.js': ['isValidElementType','element','elementType','func','bool','oneOfType'],
      'node_modules/react-dom/index.js': ['render','findDOMNode'],
      'node_modules/react-is/index.js': ['isValidElementType','ForwardRef'],
    },
  }),

  babel({
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-async-to-generator',
    ],
  }),

  replace({
    ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  globals(),
];

const globalNames= {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  '@rtcjs/webrtc-signaling':'SignalingService',
  '@rtcjs/webrtc-peer':'PeerConnection',
  '@rtcjs/ui':'VideoClientUI',
  '@rtcjs/contacts':'Contacts'
}

const externals =["react", "react-dom", "prop-types"]
module.exports = [

  {
    input: './rtcjs/rtc-demo/client/index.js',
    external: externals,
   output: {
     file: './rtcjs/rtc-demo/public/index.js',
     format: 'iife',
     sourcemap: 'inline',
     globals: globalNames,
   },
   
   plugins: appPlugin,
 },



];
