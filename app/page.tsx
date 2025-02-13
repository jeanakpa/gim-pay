import Header from "@/components/header"
import PaymentMethods from "@/components/payment-methods"
import Solutions from "@/components/solutions"
import WhyChooseUs from "@/components/why-choose-us"
import Partners from "@/components/partners"
import Footer from "@/components/footer"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PaymentMethods />
        <Solutions />
        <WhyChooseUs />
        <Partners />
      </main>
      <Footer />
    </div>
  )
}

