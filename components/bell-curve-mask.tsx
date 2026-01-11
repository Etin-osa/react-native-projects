import { Colors } from "@/constants/theme"
import { Canvas, Group, Path, RadialGradient, Rect, Skia, vec } from "@shopify/react-native-skia"
import { useMemo } from "react"
import { Dimensions, ViewStyle } from "react-native"

interface BellCurveMaskProps {
    width?: number
    height?: number
    backgroundColor?: string
    style?: ViewStyle
}

export const BellCurveMask = ({ 
    style 
}: BellCurveMaskProps) => {
    const width = Dimensions.get("window").width
    const height = 100
    const backgroundColor = Colors.dark.background

    const maskPath = useMemo(() => {
        const path = Skia.Path.Make()
        
        path.moveTo(0, 0)
        path.lineTo(width, 0)
        path.lineTo(width, height)
        
        const center = width / 2
        
        const steps = 60
        const stepSize = width / steps
        
        for (let i = 0; i <= steps; i++) {
            const x = width - (i * stepSize)
            
            const dist = Math.abs(x - center)
            const normalizedDist = dist / (width / 2)
            
            const amplitude = height * 0.7 
            const baseHeight = height * 0.2
            
            const curveFactor = Math.pow(Math.max(0, 1 - normalizedDist), 1.5)
            const holeHeight = baseHeight + (amplitude * curveFactor)

            path.lineTo(x, height - holeHeight)
        }
        
        path.lineTo(0, height)
        path.lineTo(0, 0)
        path.close()
        
        return path
    }, [width, height])

    return (
        <Canvas style={[{ width, height }, style]} pointerEvents="none">
            <Path 
                path={maskPath} 
                color={backgroundColor}
            />
            <Group 
                origin={vec(width / 2, height / 2)}
                transform={[{ scaleX: 1.5 }, { scaleY: 0.6 }]}
            >
                <Rect 
                    x={-width * 0.25} 
                    y={height / 2 - width / 2} 
                    width={width * 1.5} 
                    height={width}
                >
                    <RadialGradient
                        c={vec(width / 2, height / 15)}
                        r={width / 2}
                        colors={["#15171800", Colors.dark.background]}
                        positions={[0, 0.65]}
                    />
                </Rect>
            </Group>
        </Canvas>
    )
}
