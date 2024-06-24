import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const ImageComponent = (props: {
  src: string | StaticImport;
  alt: string;
  width:  number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  className: string;
}) => (
  <Image
    src={props.src}
    alt={props.alt}
    width={props.width}
    height={props.height}
  />
);

export default ImageComponent;
