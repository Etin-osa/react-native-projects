import { Colors } from "@/constants/theme"
import { Canvas, LinearGradient, Path, Rect, Skia, vec } from "@shopify/react-native-skia"
import { useMemo } from "react"
import { Dimensions, ViewStyle } from "react-native"

interface CurveLinesProps {
    width?: number
    height?: number
    backgroundColor?: string
    lineColor?: string
    style?: ViewStyle
}

export const CurveLines = ({ 
    style 
}: CurveLinesProps) => {
    const height = 100
    const width = Dimensions.get("window").width
    const lineColor = '#666666'

    const linesPath = useMemo(() => {
        const path = Skia.Path.Make()
        const numLines = 40
        const spacing = width / numLines
        const center = width / 2
        
        for (let i = 0; i <= numLines; i++) {
            const x = i * spacing
            const dist = Math.abs(x - center)
            const normalizedDist = dist / (width / 2)
            
            // Curve calculation
            // We want lines to be longest in the middle
            const amplitude = height * 0.7
            const baseHeight = height * 0.15
            
            // Using a power function for the curve shape
            const curveFactor = Math.pow(1 - normalizedDist, 2)
            const lineLength = baseHeight + (amplitude * curveFactor)
            
            // Draw line from bottom going up
            path.moveTo(x, height)
            path.lineTo(x, height - lineLength)
        }
        return path
    }, [width, height])

    return (
        <Canvas style={[{ width, height }, style]}>
            <Path 
                path={linesPath} 
                style="stroke" 
                strokeWidth={2.5} 
                color={lineColor}
                opacity={0.6}
            />
        </Canvas>
    )
}
