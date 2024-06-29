import Login_Form from "./components/Login_Form"
// import Nav_Bar from "./misc/Nav_Bar";
import { BackgroundBeams } from "../animations/Background_Beams"

const Login = () => {
    return(
        <div className="h-screen">
            {/* <Nav_Bar/> */}
            <div className="rounded-md relative flex flex-col antialiased h-full">                
                <div className="flex lg:flex-row flex-col lg:py-32 py-10">
                    <div className="xl:h-max xl:w-1/2 justify-center xl:columns-1 columns-1 pb-20 pt-10 xl:pb-0 lg:pb-0 xl:pt-20">
                        <h1 className="pt-10 relative z-10 text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-spacefont-bold object-left">
                        Welcome Back
                        </h1>
                        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10 pt-2 font-space">
                        Lorem111s ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, ullam tempora. Non veritatis laborum consequatur excepturi asperiores, esse qui architecto, voluptatibus, aliquam neque aperiam! Sed accusantium repellat aut iure quae.
                        </p>
                    </div>
                    <div className="flex h-max xl:w-1/2 justify-center z-30">
                        <Login_Form/>
                    </div>                  
                </div> 
                <BackgroundBeams />
            </div>
        </div>
    )
}

export default Login