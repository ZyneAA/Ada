import { cn } from "./util/cn"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"


const Utility_Dock = ({
    items,
    background_complement,
    background_color,
    font,
    className
}) => {
    let mouseX = useMotionValue(Infinity)
    return (
        (<motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            style={{backgroundColor: background_color}}
            className={cn(
                "mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl px-4 pb-3 pt-3",
                className
            )}>
            {items.map((item) => (
                <IconContainer background_complement={background_complement} background_color={background_color} font={font} mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>)
    )
}

function IconContainer({
    mouseX,
    background_complement,
    background_color,
    font,
    title,
    icon,
}) {
    let ref = useRef(null)

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

        return val - bounds.x - bounds.width / 2
    })

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
    let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            style={{ width, height, backgroundColor: background_complement, borderColor: background_color }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="aspect-square rounded-full flex items-center justify-center relative border">
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        style={{backgroundColor: background_complement, color: font}}
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 2, x: "-50%" }}
                        className="px-2 py-0.5 whitespace-pre rounded-md  border absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs">
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                style={{ width: widthIcon, height: heightIcon }}
                className="flex items-center justify-center">
                {icon}
            </motion.div>
        </motion.div>
    )
}

export default Utility_Dock