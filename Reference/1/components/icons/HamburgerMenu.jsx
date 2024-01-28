import GoogleFontsIcon from '@/components/icons/GoogleFontsIcon';

function HamburgerMenu({onClick}) {
    return (
        <>
            <div onClick={onClick}
            className='
                p-[2px]

                hover:cursor-pointer
                hover:bg-white/5

                active:bg-white/10
                active:rounded-[4px]
            '>
                <GoogleFontsIcon 
                    fontSettings={{ fill: 0, wght: 200, grad: 0, opsz: 36 }} 
                    iconSettings={{ icon: "menu", iconSize: '36px', iconColor: 'text-black' }}
                    containerSettings={{ width: 'w-[36px]', height: 'h-[36px]' }}
                />
            </div>
        </>
    );
}

export default HamburgerMenu;