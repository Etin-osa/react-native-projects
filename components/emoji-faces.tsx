import { Canvas, Circle, Paint, Path } from '@shopify/react-native-skia'
import React from 'react'
import { Dimensions } from 'react-native'
import { BothTeeth, CurvedEye, SimpleLeftEye, SimpleRightEye, TeethWithTongue } from './facial-features'

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


export const CuriousFace: React.FC<FaceProps> = ({ color }) => {
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

export const CalmFace: React.FC<FaceProps> = ({ color }) => {
    const topWidth = SCREEN_WIDTH * 0.6
    const bottomWidth = SCREEN_WIDTH * 2.3
    const visibleHeight = SCREEN_HEIGHT
    const radius = 60
    const topY = 45
    const bottomY = visibleHeight
    const topLeftX = (bottomWidth - topWidth) / 2
    const topRightX = topLeftX + topWidth
    const bottomLeftX = 0
    const bottomRightX = bottomWidth

    // Path: start at top left, round top left, top, round top right, right side, bottom, left side
    const path = `
        M ${topLeftX + radius} ${topY}
        L ${topRightX - radius} ${topY}
        Q ${topRightX} ${topY} ${topRightX + radius * 0.6} ${topY + radius * 0.8}
        L ${bottomRightX} ${bottomY}
        L ${bottomLeftX} ${bottomY}
        L ${topLeftX - radius * 0.6} ${topY + radius * 0.8}
        Q ${topLeftX} ${topY} ${topLeftX + radius} ${topY}
        Z
    `

    return (
        <Canvas
            style={{
                position: 'absolute',
                width: bottomWidth,
                height: visibleHeight,
                left: SCREEN_WIDTH / 2 - bottomWidth / 2,
                top: 0
            }}
        >
            <Path path={path} color={color} />
        </Canvas>
    )
}

export const WorriedFace: React.FC<FaceProps> = ({ color}) => {
    return (
        <Canvas style={{ width: 80, height: 80 }}>
            <Circle cx={80 / 2} cy={80 / 2} r={80 / 2 - 4} color="#FFA500" />
            <Circle cx={80 / 2} cy={80 / 2} r={80 / 2 - 4}>
                <Paint color="#000" style="stroke" strokeWidth={2} />
            </Circle>
        </Canvas>
    )
}

export const FrustratedFace: React.FC<FaceProps> = ({ color}) => {
    return (
        <Canvas style={{ width: 80, height: 80 }}>
            <Circle cx={80 / 2} cy={80 / 2} r={80 / 2 - 4} color="#FF6B6B" />
            <Circle cx={80 / 2} cy={80 / 2} r={80 / 2 - 4}>
                <Paint color="#000" style="stroke" strokeWidth={2} />
            </Circle>
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
