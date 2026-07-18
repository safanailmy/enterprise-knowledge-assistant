export default function Greeting() {

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
            ? "Good Afternoon"
            : "Good Evening";

    return (

        <section className="text-center">

            <h1
                className="
                    text-4xl
                    font-bold
                    text-white
                "
            >
                {greeting}, Safana
            </h1>

            <p
                className="
                    mt-4
                    text-l
                    text-white/60
                "
            >
                What would you like to know today?
            </p>

        </section>

    );

}