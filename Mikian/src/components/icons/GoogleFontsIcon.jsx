function GoogleFontsIcon({ iconSettings, fontSettings, containerSettings }) {

    // <GoogleFontsIcon 
    //     fontSettings={{ fill: 0, wght: 100, grad: 0, opsz: 24 }} 
    //     iconSettings={{ icon: "home", iconSize: '24px', iconColor: 'text-white' }}
    //     containerSettings={{ width: 'w-[24px]', height: 'h-[24px]' }}
    // />

    const { icon, iconSize, iconColor } = iconSettings;
    const { fill, wght, grad, opsz } = fontSettings;
    const { width, height } = containerSettings;

    return (
        <>
            <div className={`
                transistion-all
                duration-[250ms]

                flex
                justify-center
                items-center

                select-none

                ${iconColor}
                ${width}
                ${height}
            `} 
            style={{fontVariationSettings: `
                    'FILL' ${fill}, 
                    'wght' ${wght}, 
                    'GRAD' ${grad}, 
                    'opsz' ${opsz}
                `}}>
                <span className="material-symbols-outlined" style={{ fontSize: iconSize }}>{icon}</span>
            </div>
        </>
    );
}
export default GoogleFontsIcon;