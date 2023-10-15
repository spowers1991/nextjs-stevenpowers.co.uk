import Link from 'next/link';
import resolveLink from './ResolveLink';

const Button = ({ href, color, children, className, newTab }) => {    
    return (
        href && 
            <Link href={resolveLink(href)} target={newTab === true ? '_blank' : null} className={`${className} relative ${color === 'purple' ? 'bg-[#9043ed]' : 'bg-[#434bed]'} hover:bg-black duration-150 py-3 px-5 text-white rounded-full uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]`}>
                {children} 
            </Link>
    )
}

export default Button;