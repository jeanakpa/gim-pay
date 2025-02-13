import GIMPayDirect from "@/components/GIMPayDirect";
import Header from "@/components/header"
import PaymentMethods from "@/components/payment-methods"
import Footer from "@/components/footer"
import SecondHeader from "@/components/second-header";
import AdminDirect from "@/components/admin-direct";
import Login from "@/components/login";


export default function DirectPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Login />
      </main>
    </div>
  )
}
