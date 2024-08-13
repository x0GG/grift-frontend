import { HOST } from "@/config/constants"

export interface SpriteProps extends React.SVGProps<SVGSVGElement> {
  id: string
  title?: string
}

export const Sprite = ({ id, title, ...props }: SpriteProps) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg">
      {title && <title>{title}</title>}
      <use href={`/img/sprites.svg#${id}`} />
    </svg>
  )
}
