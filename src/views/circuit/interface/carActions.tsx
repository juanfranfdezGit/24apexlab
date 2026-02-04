export default function CarActions() {
    return (
        <>
            <div className="pedals flex">
                <img className="brake" src="/assets/interface/brake.png" alt="brakes" />
                <img className="accelerator" src="/assets/interface/accelerator.png" alt="acceleration" />
            </div>

            <div className="speed flex">
                <img src="/assets/interface/speedometer.png" alt="speedometer" />
                <p>260</p>
            </div>
        </>
    )
}