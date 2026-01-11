import { Group, Mask, Path, Skia } from '@shopify/react-native-skia'
import React, { ReactNode } from 'react'

interface FacialProps {
    x: number
    y: number
    size: number
}

interface MouthMaskProps {
    x: number
    y: number
    size: number
    children?: ReactNode
}

const MouthMask: React.FC<MouthMaskProps> = ({ x, y, size, children }) => {
    const width = size * 3
    const height = size * 1.9
    const r = 8
    const mouthPath = `
        M ${x - width / 2 + r} ${y}
        L ${x + width / 2 - r} ${y}
        Q ${x + width / 2} ${y} ${x + width / 2} ${y + r}
        Q ${x} ${y + height} ${x - width / 2} ${y + r}
        Q ${x - width / 2} ${y} ${x - width / 2 + r} ${y}
        Z
    `
    return (
        <Group>
            <Path path={mouthPath} color="#000000" />
            <Mask mask={<Path path={mouthPath} color="white" />}>
                {children}
            </Mask>
        </Group>
    )
}

export const SimpleLeftEye: React.FC<FacialProps> = ({ x, y, size }) => {
    const outerRadius = size * 0.42
    const pupilRadius = size * 0.30
    const highlightRadius = size * 0.12
    // Pupil is offset slightly right from center
    const pupilOffsetX = size * 0.03

    return (
        <Group>
            <Path path={`M ${x} ${y} m -${outerRadius},0 a${outerRadius},${outerRadius} 0 1,0 ${outerRadius*2},0 a${outerRadius},${outerRadius} 0 1,0 -${outerRadius*2},0`} color="#fff" />
            <Path path={`M ${x + pupilOffsetX} ${y} m -${pupilRadius},0 a${pupilRadius},${pupilRadius} 0 1,0 ${pupilRadius*2},0 a${pupilRadius},${pupilRadius} 0 1,0 -${pupilRadius*2},0`} color="#000" />
            <Path path={`M ${x + pupilOffsetX - pupilRadius * 0.5} ${y - pupilRadius * 0.5} m -${highlightRadius},0 a${highlightRadius},${highlightRadius} 0 1,0 ${highlightRadius*2},0 a${highlightRadius},${highlightRadius} 0 1,0 -${highlightRadius*2},0`} color="#fff" />
        </Group>
    )
}

export const SimpleRightEye: React.FC<FacialProps> = ({ x, y, size }) => {
    const outerRadius = size * 0.42
    const pupilRadius = size * 0.30
    const highlightRadius = size * 0.12
    // Pupil is offset slightly left from center
    const pupilOffsetX = -size * 0.03

    return (
        <Group>
            <Path path={`M ${x} ${y} m -${outerRadius},0 a${outerRadius},${outerRadius} 0 1,0 ${outerRadius*2},0 a${outerRadius},${outerRadius} 0 1,0 -${outerRadius*2},0`} color="#fff" />
            <Path path={`M ${x + pupilOffsetX} ${y} m -${pupilRadius},0 a${pupilRadius},${pupilRadius} 0 1,0 ${pupilRadius*2},0 a${pupilRadius},${pupilRadius} 0 1,0 -${pupilRadius*2},0`} color="#000" />
            <Path path={`M ${x + pupilOffsetX - pupilRadius * 0.5} ${y - pupilRadius * 0.5} m -${highlightRadius},0 a${highlightRadius},${highlightRadius} 0 1,0 ${highlightRadius*2},0 a${highlightRadius},${highlightRadius} 0 1,0 -${highlightRadius*2},0`} color="#fff" />
        </Group>
    )
}

export const CurvedEye: React.FC<FacialProps> = ({ x, y, size }) => {
    const radius = size / 2
    const path = Skia.Path.Make()
    path.addArc({ x: x - radius, y: y - radius, width: size * 0.8, height: size * 0.8 }, 180, 180)
    return (
        <Path
            path={path}
            color="#000"
            style="stroke"
            strokeWidth={size * 0.15}
            strokeCap="round"
        />
    )
}

export const BothTeeth: React.FC<FacialProps> = ({ x, y, size }) => {
    const width = size * 3
    const height = size * 1.9
    const toothWidth = width * 0.7
    const topToothHeight = height * 0.4
    const bottomToothHeight = height * 0.25
    const bulge = 25
    const topToothPath = `
        M ${x - toothWidth / 2} ${y - 5} 
        Q ${x - toothWidth / 2 - bulge} ${y + topToothHeight / 2} ${x - toothWidth / 2} ${y + topToothHeight}
        L ${x + toothWidth / 2} ${y + topToothHeight}
        Q ${x + toothWidth / 2 + bulge} ${y + topToothHeight / 2} ${x + toothWidth / 2} ${y - 5}
        Z
    `
    const bottomY = y + height - bottomToothHeight - 5
    const bottomToothPath = `
        M ${x - toothWidth / 2} ${y + height + 5}
        Q ${x - toothWidth / 2 - bulge} ${bottomY + bottomToothHeight / 2} ${x - toothWidth / 2} ${bottomY}
        L ${x + toothWidth / 2} ${bottomY}
        Q ${x + toothWidth / 2 + bulge} ${bottomY + bottomToothHeight / 2} ${x + toothWidth / 2} ${y + height + 5}
        Z
    `
    return (
        <MouthMask x={x} y={y} size={size}>
            <Group>
                <Path path={topToothPath} color="#ffffff" transform={[{ translateY: -20 }]} />
                <Path path={bottomToothPath} color="#ffffff" transform={[{ translateY: -40 }]} />
            </Group>
        </MouthMask>
    )
}

export const TeethWithTongue: React.FC<FacialProps> = ({ x, y, size }) => {
    const width = size * 3
    const height = size * 1.9
    const toothWidth = width * 0.5
    const topToothHeight = height * 0.4
    const bulge = 25
    
    const topToothPath = `
        M ${x - toothWidth / 2} ${y - 5} 
        Q ${x - toothWidth / 2 - bulge} ${y + topToothHeight / 2} ${x - toothWidth / 2} ${y + topToothHeight}
        L ${x + toothWidth / 2} ${y + topToothHeight}
        Q ${x + toothWidth / 2 + bulge} ${y + topToothHeight / 2} ${x + toothWidth / 2} ${y - 5}
        Z
    `

    const tongueRadius = toothWidth * 0.35
    const tongueCx = x
    const tongueCy = y + height * 1.05

    return (
        <MouthMask x={x} y={y} size={size * 0.7}>
            <Group>
                <Path path={topToothPath} color="#fff" transform={[{ translateY: -35 }]} />
                <Path 
                    color="#e74c3c" 
                    transform={[{ translateY: -65 }]}
                    path={
                        `M ${tongueCx} ${tongueCy} m -${tongueRadius},0 a${tongueRadius},${tongueRadius} 0 1,0 ${tongueRadius*2},0 a${tongueRadius},${tongueRadius} 0 1,0 -${tongueRadius*2},0`
                    } 
                />
            </Group>
        </MouthMask>
    )
}