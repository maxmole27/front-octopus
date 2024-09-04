import './heading.css'

type Levels = 1 | 2 | 3 | 4 | 5 | 6

export type HeadingProps = React.HTMLProps<HTMLHeadingElement> & {
  children: React.ReactNode
  level: Levels
}

export type HeadingWithImageProps = React.HTMLProps<HTMLHeadingElement> & {
  children: React.ReactNode
  level: Levels
  image: string
}

function Heading ({ children, level = 1, ...rest }: HeadingProps) {
  const headingList = {
    h1: <h1 className="heading heading--h1" {...rest}>{children}</h1>,
    h2: <h2 className="heading heading--h2" {...rest}>{children}</h2>,
    h3: <h3 className="heading heading--h3" {...rest}>{children}</h3>,
    h4: <h4 className="heading heading--h4" {...rest}>{children}</h4>,
    h5: <h5 className="heading heading--h5" {...rest}>{children}</h5>,
    h6: <h6 className="heading heading--h6" {...rest}>{children}</h6>
  }

  return headingList[`h${level}`]
}

export function HeadingWithImage ({ children, level = 1, image, ...rest }: HeadingWithImageProps) {
  const headingList = {
    h1: <h1 className="heading heading--h1" {...rest}>{children}</h1>,
    h2: <h2 className="heading heading--h2" {...rest}>{children}</h2>,
    h3: <h3 className="heading heading--h3" {...rest}>{children}</h3>,
    h4: <h4 className="heading heading--h4" {...rest}>{children}</h4>,
    h5: <h5 className="heading heading--h5" {...rest}>{children}</h5>,
    h6: <h6 className="heading heading--h6" {...rest}>{children}</h6>
  }

  return (
    <div className="heading-with-image">
      <img src={image} alt="heading" />
      {headingList[`h${level}`]}
    </div>
  )
}

export default Heading
