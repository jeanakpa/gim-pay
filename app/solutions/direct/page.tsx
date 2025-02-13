import GIMPayDirect from "@/components/GIMPayDirect";
import Header from "@/components/header"
import PaymentMethods from "@/components/payment-methods"
import Footer from "@/components/footer"
import SecondHeader from "@/components/second-header";
import Inscription from "@/components/inscription";
import AdminDirect from "@/components/admin-direct";


export default function DirectPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SecondHeader
        title="GIM-PAY Direct"
        description="Recevez des paiements instantanément via Mobile Money et cartes bancaires, sans intégration technique."
        imageSrc="/Direct.webp"
      />
      {/* Contenu spécifique à GIM-PAY Direct */}
      <main className="flex-grow">
        <GIMPayDirect />
      </main>
      <Footer />
    </div>
  )
}
