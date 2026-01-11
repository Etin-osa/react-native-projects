import { Canvas, Path, Skia } from "@shopify/react-native-skia"
import { useMemo } from "react"
import { Dimensions, ViewStyle } from "react-native"

interface CurveLinesProps {
    style?: ViewStyle
}

export const CurveLines = ({ 
    style,
}: CurveLinesProps) => {
    const width = Dimensions.get("window").width
    const height = 100
    const lineColor = '#666666'

    const linesPath = useMemo(() => {
        const path = Skia.Path.Make()
        const numLines = 30
        const spacing = width / numLines
        
        for (let i = 0; i <= numLines; i++) {
            const x = i * spacing
            path.moveTo(x, height)
            path.lineTo(x, 0)
        }
        return path
    }, [width, height])

    return (
        <Canvas style={[{ width, height }, style]}>
            <Path 
                path={linesPath} 
                style="stroke" 
                strokeWidth={1.5} 
                color={lineColor}
                opacity={0.6}
            />
        </Canvas>
    )
}
