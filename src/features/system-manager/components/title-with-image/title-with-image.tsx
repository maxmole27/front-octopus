import './title-with-image.css'

interface TitleWithImageProps {
  title?: string;
  imageUrl: string;
}

function TitleWithImage ({ title, imageUrl }: TitleWithImageProps) {
  title = title || ''

  return (
      <div className="title_with_image">
        <article className='title_with_image__img' style={{ backgroundImage: `url(${imageUrl})` }} />
        <h2> Picklist: {title} </h2>

      </div>
  )
}
export default TitleWithImage
