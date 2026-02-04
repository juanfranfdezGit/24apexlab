type CircuitLogoProps = {
  logo?: string;
  alt?: string;
};

export default function CircuitLogo({ logo, alt }: CircuitLogoProps) {
    return (
        <>
            <div className="circuitLogoInterface">
                <img src={logo} alt={alt} />
            </div>
        </>
    )
}