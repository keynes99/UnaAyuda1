import Link from "next/dist/client/link";
import menu from "../assets/menu.png";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCart } from "../lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
//import { authOptions } from "../api/auth/[...nextauth]/route";
// import UserMenuButton from "./UserMenuButton";

async function searchServices(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if(searchQuery){
        redirect("/search?query=" + searchQuery);
    }
}


export default async function NavBar(){
    const session = await getServerSession(authOptions);
    const cart = await getCart();

    return(
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href='/' className="btn btn-ghost text-xl normal-case">
                        <Image src={menu} height={40} width={40} alt="UNa Ayuda logo"/>
                        UNa Ayuda
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchServices}>
                        <div className="form-control">
                            <input
                                name='searchQuery'
                                placeholder='Buscar'
                                className="input input-bordered w-full min-w-[100px]"
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session}/>
                </div>
            </div>
        </div>
    );
}