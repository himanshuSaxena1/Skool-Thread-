"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShieldCheckIcon,
  TruckIcon,
  RefreshCwIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AwardIcon,
  MenuIcon,
  XIcon,
  CheckIcon,
} from "lucide-react"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const productCategories = {
  shirts: [
    {
      name: "Classic White Shirt",
      price: "$24.99",
      originalPrice: "$29.99",
      images: ["/shirt-1.jpg", "/shirt-2.jpg", "/shirt-3.jpg"],
      features: ["100% Cotton", "Easy Care", "Wrinkle Resistant", "Reinforced Collar", "Machine Washable"],
      rating: 4.8,
      reviews: 124,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["White", "Light Blue", "Cream"],
      description: "Our premium white shirt combines comfort with durability, perfect for daily school wear.",
    },
    {
      name: "Polo Shirt - Navy",
      price: "$22.99",
      originalPrice: "$27.99",
      images: ["/shirt-2.jpg", "/placeholder-n7et2.png", "/placeholder-bypnh.png"],
      features: ["Moisture Wicking", "Stain Resistant", "UV Protection", "Breathable Fabric", "Color Fast"],
      rating: 4.9,
      reviews: 89,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "White", "Light Blue", "Gray"],
      description: "High-performance polo shirt with advanced moisture-wicking technology for all-day comfort.",
    },
    {
      name: "Oxford Button-Down",
      price: "$28.99",
      originalPrice: "$34.99",
      images: ["/shirt-3.jpg", "/placeholder-qpsa5.png", "/placeholder-r34st.png"],
      features: ["Premium Cotton", "Reinforced Seams", "Classic Fit", "Button-Down Collar", "Chest Pocket"],
      rating: 4.7,
      reviews: 156,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["White", "Light Blue", "Pink", "Yellow"],
      description: "Traditional Oxford shirt with premium cotton construction and timeless styling.",
    },
  ],
  pants: [
    {
      name: "Classic Chinos",
      price: "$32.99",
      originalPrice: "$39.99",
      images: ["/pant-1.jpg", "/placeholder-r34st.png", "/placeholder-u00nt.png"],
      features: ["Stretch Fabric", "Reinforced Knees", "Adjustable Waist", "Stain Resistant", "Wrinkle Free"],
      rating: 4.8,
      reviews: 203,
      sizes: ["26", "28", "30", "32", "34", "36", "38", "40"],
      colors: ["Khaki", "Navy", "Black", "Gray"],
      description: "Comfortable chinos with stretch fabric and reinforced construction for active students.",
    },
    {
      name: "Pleated Trousers",
      price: "$29.99",
      originalPrice: "$35.99",
      images: ["/pant-2.jpg", "/placeholder-qpsa5.png", "/placeholder-6fp0g.png"],
      features: ["Wrinkle Free", "Machine Washable", "Classic Fit", "Belt Loops", "Side Pockets"],
      rating: 4.6,
      reviews: 178,
      sizes: ["26", "28", "30", "32", "34", "36", "38", "40"],
      colors: ["Navy", "Black", "Gray", "Charcoal"],
      description: "Traditional pleated trousers with wrinkle-free fabric for a polished appearance.",
    },
    {
      name: "Cargo Pants",
      price: "$34.99",
      originalPrice: "$42.99",
      images: ["/pant-3.jpg", "/placeholder-bypnh.png", "/placeholder-qlehi.png"],
      features: ["Multiple Pockets", "Durable Fabric", "Comfort Fit", "Reinforced Stitching", "Easy Care"],
      rating: 4.7,
      reviews: 92,
      sizes: ["26", "28", "30", "32", "34", "36", "38", "40"],
      colors: ["Khaki", "Navy", "Black", "Olive"],
      description: "Practical cargo pants with multiple pockets and durable construction for everyday use.",
    },
  ],
  sweaters: [
    {
      name: "V-Neck Sweater",
      price: "$38.99",
      originalPrice: "$45.99",
      images: ["/sweater-1.jpg", "/placeholder-6fp0g.png", "/placeholder-qlehi.png"],
      features: ["100% Wool", "Machine Washable", "Pill Resistant", "Classic V-Neck", "Ribbed Trim"],
      rating: 4.9,
      reviews: 167,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Gray", "Burgundy", "Forest Green"],
      description: "Premium wool v-neck sweater with pill-resistant finish and classic styling.",
    },
    {
      name: "Cardigan Sweater",
      price: "$42.99",
      originalPrice: "$49.99",
      images: ["/sweater-2.jpg", "/placeholder-bypnh.png", "/placeholder-n7et2.png"],
      features: ["Button Front", "Soft Knit", "Easy Care", "Two Pockets", "Ribbed Cuffs"],
      rating: 4.8,
      reviews: 134,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Gray", "Cream", "Black"],
      description: "Comfortable cardigan with button front closure and soft knit construction.",
    },
    {
      name: "Sweater",
      price: "$35.99",
      originalPrice: "$42.99",
      images: ["/sweater-3.jpg", "/placeholder-u00nt.png", "/placeholder-ko2n1.png"],
      features: ["Cotton Blend", "Kangaroo Pocket", "Drawstring Hood", "Ribbed Cuffs", "Soft Interior"],
      rating: 4.7,
      reviews: 211,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Gray", "Black", "Maroon"],
      description: "Cozy pullover hoodie with kangaroo pocket and soft cotton blend fabric.",
    },
  ],
  ties: [
    {
      name: "Striped School Tie",
      price: "$14.99",
      originalPrice: "$19.99",
      images: ["/tie-1.jpg", "/placeholder-n7et2.png"],
      features: ["100% Polyester", "Pre-Tied", "Adjustable Length", "Durable Fabric", "Easy Care"],
      rating: 4.8,
      reviews: 89,
      sizes: ["One Size"],
      colors: ["Navy/Red", "Navy/Gold", "Black/Gray"],
      description: "Classic striped school tie in durable polyester fabric, pre-tied for convenience.",
    },
    {
      name: "Solid Color Tie",
      price: "$12.99",
      originalPrice: "$16.99",
      images: ["/tie-2.jpg", "/placeholder-qpsa5.png"],
      features: ["100% Polyester", "Pre-Tied", "Adjustable Length", "Stain Resistant", "Easy Care"],
      rating: 4.7,
      reviews: 76,
      sizes: ["One Size"],
      colors: ["Navy", "Black", "Gray", "Burgundy"],
      description: "Sleek solid color tie in stain-resistant polyester, perfect for any school uniform.",
    },
    {
      name: "Patterned Tie",
      price: "$15.99",
      originalPrice: "$20.99",
      images: ["/tie-3.jpg", "/placeholder-nteg3.png"],
      features: ["100% Polyester", "Pre-Tied", "Adjustable Length", "Unique Patterns", "Easy Care"],
      rating: 4.9,
      reviews: 54,
      sizes: ["One Size"],
      colors: ["Navy/White", "Black/Red", "Gray/Blue"],
      description: "Eye-catching patterned tie in durable polyester, pre-tied for easy wear.",
    },
  ],
  shoes: [
    {
      name: "Classic Black Dress Shoes",
      price: "$49.99",
      originalPrice: "$59.99",
      images: ["/shoes-1.jpg", "/placeholder-qlehi.png"],
      features: ["Genuine Leather", "Non-Slip Sole", "Cushioned Insole", "Durable Construction", "Easy Care"],
      rating: 4.8,
      reviews: 145,
      sizes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      colors: ["Black", "Brown"],
      description: "Timeless black dress shoes made from genuine leather with a non-slip sole for safety.",
    },
    {
      name: "Navy Blue Loafers",
      price: "$44.99",
      originalPrice: "$54.99",
      images: ["/shoes-2.jpg", "/placeholder-u00nt.png"],
      features: ["Synthetic Leather", "Slip-On Design", "Cushioned Insole", "Lightweight", "Easy Care"],
      rating: 4.7,
      reviews: 98,
      sizes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      colors: ["Navy", "Black", "Brown"],
      description: "Comfortable navy blue loafers with a slip-on design and cushioned insole for all-day wear.",
    },
    {
      name: "White Athletic Shoes",
      price: "$39.99",
      originalPrice: "$49.99",
      images: ["/shoes-3.jpg", "/placeholder-6fp0g.png"],
      features: ["Breathable Mesh", "Non-Slip Sole", "Lightweight", "Cushioned Insole", "Easy Care"],
      rating: 4.9,
      reviews: 123,
      sizes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      colors: ["White", "Black", "Gray"],
      description: "Versatile white athletic shoes with breathable mesh and a non-slip sole for active students.",
    },
  ],
}

const benefits = [
  {
    icon: ShieldCheckIcon,
    title: "Premium Quality",
    description: "Durable materials that withstand daily wear and frequent washing",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    description: "Quick shipping to get uniforms ready for the school year",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: RefreshCwIcon,
    title: "Easy Returns",
    description: "Hassle-free returns and exchanges within 30 days",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: UsersIcon,
    title: "Custom Sizing",
    description: "Wide range of sizes to ensure the perfect fit for every student",
    color: "bg-orange-100 text-orange-600",
  },
]

const navItems = [
  { name: "Benefits", href: "#benefits" },
  { name: "Sizing", href: "#sizing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

const uniformTabOptions = [
  { label: "Shirts", value: "shirts" },
  { label: "Pants", value: "pants" },
  { label: "Sweaters", value: "sweaters" },
  { label: "Ties", value: "ties" },
  { label: "Shoes", value: "shoes" },
]

const heroBackgrounds = [
  {
    image: "/bg-1.jpg",
    title: "Premium School Uniforms",
    subtitle: "Quality that lasts, comfort that matters",
  },
  {
    image: "/bg-2.jpg",
    title: "Durable School Trousers",
    subtitle: "Step into comfort and style",
  },
  {
    image: "/bg-3.jpg",
    title: "Complete Accessories",
    subtitle: "Everything you need for school",
  },
  {
    image: "/bg-4.jpg",
    title: "Quality Stationery",
    subtitle: "Tools for academic success",
  },
]

export default function SkoolThreadsLanding() {
  const [activeTab, setActiveTab] = useState("shirts")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroBackgrounds.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroBackgrounds.length)
  }

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroBackgrounds.length) % heroBackgrounds.length)
  }

  const goToHeroSlide = (index: number) => {
    setCurrentHeroSlide(index)
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const gotoTab = (tab: string) => {
    const section = document.querySelector("#products")
    if (section) section.scrollIntoView({ behavior: "smooth" })
    window.setTimeout(() => setActiveTab(tab), 500) // activate after scroll starts
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background/80 backdrop-blur-sm shadow-sm"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-14 h-14 bg-transparent rounded-lg flex items-center justify-center">
                <Image src="/skool_thread_logo.png" alt="Skool Threads" width={48} height={48} />
              </div>
              <span className="text-xl font-bold text-foreground transition-colors">Skool Threads</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-primary font-medium focus:outline-none flex items-center gap-1">
                  School Uniforms
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down-icon lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-40">
                  {uniformTabOptions.map((opt) => (
                    <DropdownMenuItem key={opt.value} className="font-bold" onClick={() => gotoTab(opt.value)}>
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
              <Button
                onClick={() => gotoTab("shirts")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 shadow-sm"
              >
                Browse Uniforms
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6 text-foreground" />
              ) : (
                <MenuIcon className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-md border-t"
            >
              <div className="py-4 space-y-2">
                <div className="px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">School Uniforms</div>
                <div className="grid grid-cols-3 gap-2 px-4">
                  {uniformTabOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      variant="secondary"
                      className="bg-secondary"
                      onClick={() => gotoTab(opt.value)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
        {/* Background Images Slider */}
        <div className="absolute inset-0">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroSlide ? "opacity-100" : "opacity-0"
                }`}
              style={{
                backgroundImage: `url('${bg.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />


        {/* Navigation Arrows */}
        <button
          onClick={prevHeroSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
        </button>

        <button
          onClick={nextHeroSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => goToHeroSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentHeroSlide ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/20 text-primary px-5 py-2 rounded-full text-sm font-semibold">
              Trusted by 500+ Schools
            </div>
            <motion.h1
              key={currentHeroSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black leading-tight text-balance"
            >
              Online Store for
              <span className="block text-gradient">{heroBackgrounds[currentHeroSlide].title}</span>& Much More
            </motion.h1>
            <motion.p
              key={`subtitle-${currentHeroSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90"
            >
              {heroBackgrounds[currentHeroSlide].subtitle} - Premium schoolwear that blends comfort, durability, and
              modern style.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => gotoTab("shirts")}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl"
              >
                Explore Collection
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("#contact")}
                className="border-2 border-primary text-primary px-8 py-4 rounded-xl"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <AwardIcon className="w-4 h-4" />
              Premium Collection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Uniform Collection</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of school uniforms, designed with quality materials and attention to
              detail. Each piece is crafted for comfort, durability, and style.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 gap-2 mb-8 h-14 bg-muted/50 p-1">
                <TabsTrigger
                  value="shirts"
                  className="text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Shirts
                </TabsTrigger>
                <TabsTrigger
                  value="pants"
                  className="text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Pants
                </TabsTrigger>
                <TabsTrigger
                  value="sweaters"
                  className="text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Sweaters
                </TabsTrigger>
                <TabsTrigger
                  value="ties"
                  className="text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Ties
                </TabsTrigger>
                <TabsTrigger
                  value="shoes"
                  className="text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Shoes
                </TabsTrigger>
              </TabsList>

              {Object.entries(productCategories).map(([category, products]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {products.map((product, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden">
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className=" w-48 md:w-72 mx-auto h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-lg text-center group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </section>

      <section id="benefits" className="py-24 bg-gradient-to-br from-muted/50 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Why Choose Skool Threads?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're committed to providing the best school uniform experience for students, parents, and schools.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp} className="group">
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${benefit.color}`}
                    >
                      <benefit.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="sizing" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckIcon className="w-4 h-4" />
                Perfect Fit Guarantee
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Perfect Fit Guaranteed</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Our comprehensive sizing guide ensures you get the perfect fit every time. With detailed measurements
                and helpful tips, finding the right size is easy.
              </p>
              <div className="space-y-6 mb-8">
                {[
                  "Step-by-step measuring instructions",
                  "Size charts for all age groups",
                  "Fit recommendations by body type",
                  "Free size exchanges within 30 days",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <Image
                width={600}
                height={400}
                src="/sizing-guide-chart-measurements.jpg"
                alt="Sizing Guide"
                className="relative rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                width={600}
                height={400}
                src="/modern-uniform-manufacturing-facility-with-quality.jpg"
                alt="About Skool Threads"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Skool Threads</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2015, Skool Threads has been dedicated to providing high-quality school uniforms that combine
                comfort, durability, and style. We understand the importance of looking and feeling confident in school,
                which is why we use only the finest materials and latest manufacturing techniques.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-primary mb-2"
                  >
                    50,000+
                  </motion.div>
                  <p className="text-sm text-muted-foreground">Happy Students</p>
                </div>
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-primary mb-2"
                  >
                    500+
                  </motion.div>
                  <p className="text-sm text-muted-foreground">Partner Schools</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reach us instantly via WhatsApp, phone, or email. No forms—fast responses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <img src="/whatsapp-icon.png" alt="" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <img src="/simple-phone-icon.png" alt="" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <a href="tel:+15551234567" className="text-primary font-medium hover:underline">
                  +1 (555) 123-4567
                </a>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <img src="/email-icon.png" alt="" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <a href="mailto:info@skoolthreads.com" className="text-primary font-medium hover:underline">
                  info@skoolthreads.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="container mx-auto py-20 bg-muted/50 w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Find us</h1>
        <div className="mapouter px-4 w-full h-[350px] md:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d19285.19433772497!2d79.3957946!3d28.3439025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWZ%20B-63%20Street%20no.8%2C%20Sant%20garh%2C%20Near%20tilak%20nagar%2C%20New%20Delhi%20Pincode-110018!5e0!3m2!1sen!2sin!4v1758108993924!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Skool Threads</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Quality school uniforms designed for comfort, durability, and style. Trusted by parents and schools
                nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection("#products")} className="hover:text-primary transition-colors">
                    Shop All
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("#sizing")} className="hover:text-primary transition-colors">
                    Sizing Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("#about")} className="hover:text-primary transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("#contact")} className="hover:text-primary transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => gotoTab("shirts")} className="hover:text-primary transition-colors">
                    Shirts & Polos
                  </button>
                </li>
                <li>
                  <button onClick={() => gotoTab("pants")} className="hover:text-primary transition-colors">
                    Pants & Trousers
                  </button>
                </li>
                <li>
                  <button onClick={() => gotoTab("sweaters")} className="hover:text-primary transition-colors">
                    Sweaters & Hoodies
                  </button>
                </li>
                <li>
                  <button onClick={() => gotoTab("shoes")} className="hover:text-primary transition-colors">
                    School Shoes
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp Support
                  </a>
                </li>
                <li>
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                    Call Us
                  </a>
                </li>
                <li>
                  <a href="mailto:info@skoolthreads.com" className="hover:text-primary transition-colors">
                    Email Support
                  </a>
                </li>
                <li>
                  <button onClick={() => scrollToSection("#faq")} className="hover:text-primary transition-colors">
                    Visit Store
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm opacity-80">© 2025 Skool Threads. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
