import { Canvas, center, Circle, Group, Paint, Path, Skia } from '@shopify/react-native-skia'
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
            <CurvedMouth x={centerX} y={topEyes} size={60} curve={25} />
        </Canvas>
    )
}

export const WorriedFace: React.FC<FaceProps> = ({ color}) => {
    const headWidth = SCREEN_WIDTH 
    const height = 400
    const topEyes = 110
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
                <Path path={pathString} color={color} />
            </Group>
            <SimpleLeftEye x={centerX - 30} y={topEyes} size={60} />
            <SimpleRightEye x={centerX + 30} y={topEyes} size={60} />
            <CurvedMouth x={centerX} y={topEyes + 5} size={50} curve={0} />
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
    const topEyes = 65

    return (
        <Canvas style={{
            position: 'absolute',
            width: headWidth,
            height: height,
            left: SCREEN_WIDTH / 2 - headWidth / 2,
            top: 45
        }}>
            <Path path={path} color={color} />
            <SimpleLeftEye x={centerX - 30} y={topEyes} size={60} />
            <SimpleRightEye x={centerX + 30} y={topEyes} size={60} />
        </Canvas>
    )
}

export const DespairingFace: React.FC<FaceProps> = ({ color}) => {
    return (
        <Canvas style={{ width: 80, height: 80 }}>
            <Circle cx={80 / 2} cy={80 / 2} r={80 / 2 - 4} color="#FFD93D" />
            <Circle cx={80 / 2} cy={80 / 2} r={80 / 2 - 4}>
                <Paint color="#000" style="stroke" strokeWidth={2} />
            </Circle>
        </Canvas>
    )
}
