
type Levels = 1 | 2 | 3 | 4 | 5 | 6

function Heading({ children, level = 1 }: { children: React.ReactNode, level: Levels }) {
  const headingList = {
    h1: <h1>{children}</h1>,
    h2: <h2>{children}</h2>,
    h3: <h3>{children}</h3>,
    h4: <h4>{children}</h4>,
    h5: <h5>{children}</h5>,
    h6: <h6>{children}</h6>,
  }

  return headingList[`h${level}`]
}

export default Heading