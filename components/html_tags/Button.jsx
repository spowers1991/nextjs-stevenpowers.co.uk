import Link from 'next/link';
import resolveLink from '../../utils/ResolveLink';

const Button = ({ href, color, children, className, newTab }) => {    

    let bgColor = '';
    if (color === 'purple') {
        bgColor = 'bg-[#9043ed] text-white';
    } else if (color === 'green') {
        bgColor = 'bg-[#43ed90] text-[#000] hover:text-[#fff]';
    } else {
        bgColor = 'bg-[#434bed] text-white';
    }

    return (
        href && 
            <Link href={resolveLink(href)} target={newTab === true ? '_blank' : null} className={`${className} relative ${bgColor} hover:bg-black duration-150 py-[11px] sm:py-[12px] px-5  rounded-full uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
                {children} 
            </Link>
    )
}

export default Button;