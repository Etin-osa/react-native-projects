import { Canvas, Circle, Group, Paint, Path, Skia } from '@shopify/react-native-skia'
import React from 'react'
import { Dimensions } from 'react-native'
import { BothTeeth, CurvedEye, CurvedMouth, SimpleLeftEye, SimpleRightEye, TeethWithTongue } from './facial-features'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface FaceProps {
    color: string
}

export const CheerfulFace: React.FC<FaceProps> = ({ color }) => {
    const faceRadius = SCREEN_WIDTH * 0.65
    const cy = faceRadius + 25

    return (
        <Canvas style={{ 
            position: 'absolute',
            width: faceRadius * 2, 
            height: faceRadius * 2 + 200,
            left: SCREEN_WIDTH / 2 - faceRadius,
            top: 0
        }}>
            <Circle cx={faceRadius} cy={cy} r={faceRadius} color={color} />
            <CurvedEye x={faceRadius - 35} y={cy - faceRadius * 0.7} size={50} />
            <CurvedEye x={faceRadius + 35} y={cy - faceRadius * 0.7} size={50} />
            <BothTeeth x={faceRadius - 5} y={cy - faceRadius * 0.62} size={50} />
        </Canvas>
    )
}


export const CalmFace: React.FC<FaceProps> = ({ color }) => {
    const headWidth = SCREEN_WIDTH * 3
    const height = 440
    const centerX = headWidth / 2
    const topY = 10
    const bottomY = height * 1.5

    // Draw a triangle with a curved (arc) top
    const arcWidth = 100
    const arcBaseY = topY + 80
    const arcPeakY = topY - 40
    const path = `
        M 0 ${bottomY}
        L ${centerX - arcWidth} ${arcBaseY}
        Q ${centerX} ${arcPeakY} ${centerX + arcWidth} ${arcBaseY}
        L ${headWidth} ${bottomY}
        Z
    `

    return (
        <Canvas style={{ 
            position: 'absolute',
            width: headWidth, 
            height: height + 200,
            left: SCREEN_WIDTH / 2 - headWidth / 2,
            top: 0
        }}>
            <Path path={path} color={color} />
            <SimpleLeftEye x={centerX - 30} y={arcBaseY + 30} size={60} />
            <SimpleRightEye x={centerX + 30} y={arcBaseY + 30} size={60} />
            <TeethWithTongue x={centerX} y={arcBaseY + 65} size={60} />
        </Canvas>
    )
}

export const CuriousFace: React.FC<FaceProps> = ({ color }) => {
    const headWidth = SCREEN_WIDTH * 1.3
    const height = 440
    const centerX = headWidth / 2
    const topY = -10
    const topEyes = topY + 140
    
    const pathString = `
        m 65,16 h 50 a 26,26 0 0 1 25,18 L 176,136 a 13,13 0 0 1 -12,18 H 18 A 13,13 0 0 1 5,136 L 40,34 A 26,26 0 0 1 65,16 Z
    `
    const skiaPath = Skia.Path.MakeFromSVGString(pathString);

    if (!skiaPath) {
        return null
    }

    const { x, width } = skiaPath.getBounds();

    // formula to center the path in the canvas
    const scaleX = 3.3
    const translateX = (headWidth - width * scaleX) / 2 - x * scaleX;

    return (
        <Canvas style={{ 
            position: 'absolute',
            width: headWidth, 
            height: height + 200,
            left: SCREEN_WIDTH / 2 - headWidth / 2,
            top: topY,
        }}>
            <Group transform={[{ translateX }, { scaleX }, { scaleY: 3.7 }]}> 
                <Path path={pathString} color={color}/>
            </Group>    
            <SimpleLeftEye x={centerX - 30} y={topEyes} size={60} />
            <SimpleRightEye x={centerX + 30} y={topEyes} size={60} />
            <CurvedMouth x={centerX} y={topEyes + 40} size={60} curve={25} />
        </Canvas>
    )
}

export const WorriedFace: React.FC<FaceProps> = () => {
    const headWidth = SCREEN_WIDTH 
    const height = 400
    const topEyes = 120
    const centerX = headWidth / 2
    
    const pathString = `
        m 41.63781,69.743335 c 0,0 1.350593,-37.213794 39.29569,-37.474031 37.94509,-0.260237 39.29569,37.474031 39.29569,37.474031 V 170.19456 H 41.63781 Z
    `
    const skiaPath = Skia.Path.MakeFromSVGString(pathString);

    if (!skiaPath) {
        return null
    }

    const { x, width } = skiaPath.getBounds();
    // formula to center the path in the canvas
    const scale = 4.6
    const translateX = (headWidth - width * scale) / 2 - x * scale;

    return (
        <Canvas style={{ 
            position: 'absolute',
            width: headWidth, 
            height: height + 200,
            left: SCREEN_WIDTH / 2 - headWidth / 2,
            top: 0,
        }}>
            <Group transform={[{ translateX }, { translateY: -115 }, { scale }]}>
                <Path path={pathString} color={"#D48AFB"} />
            </Group>
            <SimpleLeftEye x={centerX - 30} y={topEyes} size={60} />
            <SimpleRightEye x={centerX + 30} y={topEyes} size={60} />
            <CurvedMouth x={centerX} y={topEyes + 45} size={50} curve={0} />
        </Canvas>
    )
}

export const FrustratedFace: React.FC<FaceProps> = ({ color }) => {
    const headWidth = SCREEN_WIDTH * 0.85
    const height = 600
    const radius = 70

    const path = `
        M ${radius} 0
        H ${headWidth - radius}
        Q ${headWidth} 0 ${headWidth} ${radius}
        V ${height - radius}
        Q ${headWidth} ${height} ${headWidth - radius} ${height}
        H ${radius}
        Q 0 ${height} 0 ${height - radius}
        V ${radius}
        Q 0 0 ${radius} 0
        Z
    `

    const centerX = headWidth / 2
    const topEyes = 75

    return (
        <Canvas style={{
            position: 'absolute',
            width: headWidth,
            height: height,
            left: SCREEN_WIDTH / 2 - headWidth / 2,
            top: 45
        }}>
            <Path path={path} color={color} />
            <SimpleLeftEye 
                x={centerX - 30} 
                y={topEyes} 
                size={60} 
                showEyebrow={true}
                eyebrowTransform={[{ rotate: 2.6 }, { translateX: 15 }, { translateY: 4 }]}
                eyeSize={32}
                eyeCurve={-10}
            />
            <SimpleRightEye 
                x={centerX + 30} 
                y={topEyes} 
                size={60} 
                showEyebrow={true}
                eyebrowTransform={[{ rotate: -2.6 }, { translateX: -15 }, { translateY: 4 }]}
                eyeSize={32}
                eyeCurve={-10} 
            />
        </Canvas>
    )
}

export const DespairingFace: React.FC<FaceProps> = ({ color}) => {
    const headWidth = SCREEN_WIDTH * 1.6
    const height = 400
    const topEyes = 150
    const centerX = headWidth / 2

    const pathString = `
        m 46.582299,100.45122 c -6.948866,4.93245 -15.085187,-2.776126 -23.218164,-0.2324 -8.132978,2.54372 -10.426999,13.51457 -18.9479755,13.42056 -8.5209747,-0.094 -10.5724091,-11.11278 -18.6472895,-13.835304 -8.074882,-2.722528 -16.379283,4.804674 -23.217645,-0.279875 -6.83836,-5.084552 -2.021329,-15.204735 -6.953783,-22.153602 -4.932455,-6.948867 -16.075238,-5.740434 -18.618963,-13.873412 -2.543726,-8.132977 7.301829,-13.488997 7.395831,-22.009972 0.094,-8.520976 -9.630998,-14.092896 -6.90847,-22.167778 2.722526,-8.074881 13.835937,-6.620921 18.920489,-13.459281 5.084554,-6.83836163 0.491957,-17.062351 7.440824,-21.994806 6.948866,-4.932455 15.085188,2.776123 23.218164,0.232398 8.1329786,-2.543726 10.4269997,-13.514568 18.947976,-13.420566 8.520975,0.094 10.572409,11.112782 18.647289,13.835309 8.074882,2.722527 16.379283,-4.804679 23.217645,0.279874 6.838361,5.084553 2.02133,15.20473581 6.953784,22.1536021 4.932455,6.9488679 16.075237,5.7404349 18.618963,13.8734129 2.543725,8.132976 -7.301829,13.488997 -7.395831,22.009971 -0.094,8.520977 9.630997,14.092897 6.90847,22.167779 -2.722527,8.07488 -13.835938,6.62092 -18.92049,13.45928 -5.084553,6.838362 -0.491956,17.062352 -7.440824,21.99481 z
    `
    const skiaPath = Skia.Path.MakeFromSVGString(pathString);

    if (!skiaPath) {
        return null
    }

    const { x, width } = skiaPath.getBounds();
    // formula to center the path in the canvas
    const scale = 4.2
    const translateX = (headWidth - width * scale) / 2 - x * scale;

    return (
        <Canvas style={{ 
            position: 'absolute',
            width: headWidth, 
            height: height + 200,
            left: SCREEN_WIDTH / 2 - headWidth / 2,
            top: 0
        }}>
            <Group transform={[{ translateX }, { translateY: 150 }, { scale }]}>
                <Path path={pathString} color={color} />
            </Group>
            <SimpleLeftEye 
                x={centerX - 30} 
                y={topEyes} 
                size={60} 
                showEyebrow={true}
                eyebrowTransform={[{ rotate: -2.6 }, { translateX: -8 }, { translateY: -2 }]}
                eyeSize={34}
                eyeCurve={-8}
            />
            <SimpleRightEye 
                x={centerX + 30} 
                y={topEyes} 
                size={60} 
                showEyebrow={true}
                eyebrowTransform={[{ rotate: 2.6 }, { translateX: 8 }, { translateY: -2 }]}
                eyeSize={34}
                eyeCurve={-8} 
            />
            <CurvedMouth x={centerX} y={topEyes + 50} size={50} curve={-25} />
        </Canvas>
    )
}
