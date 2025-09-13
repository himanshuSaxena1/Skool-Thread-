"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
  RefreshCwIcon,
  UsersIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  SparklesIcon,
  AwardIcon,
  HeartIcon,
  MenuIcon,
  XIcon,
  EyeIcon,
  ZoomInIcon,
  ArrowRightIcon,
} from "lucide-react"
import { useState, useEffect } from "react"

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
      images: ["/placeholder-n7et2.png", "/placeholder-ko2n1.png", "/placeholder-nteg3.png"],
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
      images: ["/placeholder-ko2n1.png", "/placeholder-n7et2.png", "/placeholder-bypnh.png"],
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
      images: ["/placeholder-nteg3.png", "/placeholder-qpsa5.png", "/placeholder-r34st.png"],
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
      images: ["/placeholder-qpsa5.png", "/placeholder-r34st.png", "/placeholder-u00nt.png"],
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
      images: ["/placeholder-r34st.png", "/placeholder-qpsa5.png", "/placeholder-6fp0g.png"],
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
      images: ["/placeholder-u00nt.png", "/placeholder-bypnh.png", "/placeholder-qlehi.png"],
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
      images: ["/placeholder-bypnh.png", "/placeholder-6fp0g.png", "/placeholder-qlehi.png"],
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
      images: ["/placeholder-6fp0g.png", "/placeholder-bypnh.png", "/placeholder-n7et2.png"],
      features: ["Button Front", "Soft Knit", "Easy Care", "Two Pockets", "Ribbed Cuffs"],
      rating: 4.8,
      reviews: 134,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Gray", "Cream", "Black"],
      description: "Comfortable cardigan with button front closure and soft knit construction.",
    },
    {
      name: "Pullover Hoodie",
      price: "$35.99",
      originalPrice: "$42.99",
      images: ["/placeholder-qlehi.png", "/placeholder-u00nt.png", "/placeholder-ko2n1.png"],
      features: ["Cotton Blend", "Kangaroo Pocket", "Drawstring Hood", "Ribbed Cuffs", "Soft Interior"],
      rating: 4.7,
      reviews: 211,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Gray", "Black", "Maroon"],
      description: "Cozy pullover hoodie with kangaroo pocket and soft cotton blend fabric.",
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

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent",
    content: "Excellent quality uniforms that last the entire school year. My daughter loves how comfortable they are!",
    rating: 5,
    image: "/smiling-parent-woman.jpg",
  },
  {
    name: "Michael Chen",
    role: "School Administrator",
    content: "We've been ordering from Skool Threads for 3 years. Consistent quality and reliable service every time.",
    rating: 5,
    image: "/placeholder-i7bbo.png",
  },
  {
    name: "Emma Davis",
    role: "Parent",
    content: "The sizing guide was so helpful! Perfect fit on the first order. Great customer service too.",
    rating: 5,
    image: "/placeholder-npl4v.png",
  },
]

const navItems = [
  { name: "Products", href: "#products" },
  { name: "Benefits", href: "#benefits" },
  { name: "Sizing", href: "#sizing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export default function SkoolThreadsLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [activeTab, setActiveTab] = useState("shirts")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background/80 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ST</span>
              </div>
              <span className="text-xl font-bold text-foreground transition-colors">Skool Threads</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
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
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 shadow-sm">
                Shop Now
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
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="px-4 pt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                    Shop Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800" fill="none">
              <defs>
                <pattern id="geometric" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <polygon points="50,0 100,50 50,100 0,50" fill="currentColor" className="text-primary/30" />
                  <polygon points="25,25 75,25 75,75 25,75" fill="currentColor" className="text-accent/20" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geometric)" />
            </svg>
          </div>
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rotate-45 blur-2xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-semibold"
              >
                <SparklesIcon className="w-4 h-4" />
                #1 Choice for 500+ Schools
              </motion.div>

              {/* Main Heading - Gen Z Style */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-balance">
                  <span className="block text-primary">SKOOL</span>
                  <span className="block text-foreground">THREADS</span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground mt-2">
                    Where Style Meets School
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Premium uniforms designed for the modern student. Comfort meets style in every thread, trusted by
                students, parents, and schools nationwide.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("#products")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
                >
                  Shop Collection
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("#products")}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  View Catalog
                </Button>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-6 pt-4"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">4.9/5 from 2,000+ reviews</span>
                </div>
                <div className="text-sm text-muted-foreground font-medium">50,000+ Happy Students</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-3xl scale-110"></div>

                {/* Main Image */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-primary/10">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X5j6OHJPon35M8w5EBsKd3KRpC18Yo.png"
                    alt="Students in school uniforms"
                    className="w-full h-auto rounded-2xl"
                  />

                  {/* Floating Cards */}
                  <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-primary/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-700">Premium Quality</span>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-xs opacity-90">Schools Trust Us</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-10 right-10 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -z-10 bottom-10 left-10 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-bounce delay-500"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="products" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <AwardIcon className="w-4 h-4" />
              Premium Collection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Uniform Collection</h2>
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
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 h-14 bg-muted/50 p-1">
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
                                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-red-500 text-white font-semibold">
                                  Save{" "}
                                  {Math.round(
                                    ((Number.parseFloat(product.originalPrice.slice(1)) -
                                      Number.parseFloat(product.price.slice(1))) /
                                      Number.parseFloat(product.originalPrice.slice(1))) *
                                      100,
                                  )}
                                  %
                                </Badge>
                              </div>
                              <div className="absolute top-4 right-4">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-lg"
                                >
                                  <HeartIcon className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                                {product.images.map((_, imgIndex) => (
                                  <div
                                    key={imgIndex}
                                    className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-colors cursor-pointer"
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {product.rating} ({product.reviews} reviews)
                                </span>
                              </div>
                              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl font-bold text-primary">{product.price}</span>
                                <span className="text-lg text-muted-foreground line-through">
                                  {product.originalPrice}
                                </span>
                              </div>

                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium">Sizes:</span>
                                  <div className="flex gap-1">
                                    {product.sizes.slice(0, 4).map((size, sizeIndex) => (
                                      <Badge key={sizeIndex} variant="outline" className="text-xs px-2 py-1">
                                        {size}
                                      </Badge>
                                    ))}
                                    {product.sizes.length > 4 && (
                                      <Badge variant="outline" className="text-xs px-2 py-1">
                                        +{product.sizes.length - 4}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Colors:</span>
                                  <div className="flex gap-1">
                                    {product.colors.slice(0, 3).map((color, colorIndex) => (
                                      <div
                                        key={colorIndex}
                                        className="w-4 h-4 rounded-full border-2 border-gray-300"
                                        style={{
                                          backgroundColor:
                                            color.toLowerCase() === "white"
                                              ? "#ffffff"
                                              : color.toLowerCase() === "navy"
                                                ? "#1e3a8a"
                                                : color.toLowerCase() === "black"
                                                  ? "#000000"
                                                  : color.toLowerCase() === "gray"
                                                    ? "#6b7280"
                                                    : color.toLowerCase() === "khaki"
                                                      ? "#c19a6b"
                                                      : color.toLowerCase() === "light blue"
                                                        ? "#93c5fd"
                                                        : "#6b7280",
                                        }}
                                        title={color}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 mb-6">
                                {product.features.slice(0, 3).map((feature, featureIndex) => (
                                  <div
                                    key={featureIndex}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                  >
                                    <CheckIcon className="w-4 h-4 text-primary" />
                                    {feature}
                                  </div>
                                ))}
                                {product.features.length > 3 && (
                                  <div className="text-sm text-primary font-medium">
                                    +{product.features.length - 3} more features
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1 gradient-primary hover:shadow-lg hover:shadow-primary/25 text-primary-foreground transition-all duration-300">
                                  View Details
                                </Button>
                                <Button variant="outline" size="sm" className="px-3 bg-transparent">
                                  <EyeIcon className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="px-3 bg-transparent">
                                  <ZoomInIcon className="w-4 h-4" />
                                </Button>
                              </div>
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
              <Button className="gradient-primary hover:shadow-lg hover:shadow-primary/25 text-primary-foreground px-8 py-4 text-lg font-semibold">
                View Sizing Guide
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <img
                src="/sizing-guide-chart-measurements.jpg"
                alt="Sizing Guide"
                className="relative rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              What Our Customers Say
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Don't just take our word for it. Here's what parents and schools are saying about Skool Threads.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-lg p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg text-foreground leading-relaxed" style={{ fontFamily: "var(--font-open-sans)" }}>
                "{testimonials[currentTestimonial].content}"
              </p>
            </motion.div>

            <div className="flex justify-center items-center mt-8 gap-4">
              <Button variant="outline" size="sm" onClick={prevTestimonial} className="rounded-full bg-transparent">
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={nextTestimonial} className="rounded-full bg-transparent">
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
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
              <img
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
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                About Skool Threads
              </h2>
              <p
                className="text-lg text-muted-foreground mb-6 leading-relaxed"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
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
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Get In Touch
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Have questions about our uniforms or need help with sizing? We're here to help!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-montserrat)" }}>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-primary" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MailIcon className="w-5 h-5 text-primary" />
                      <span>info@skoolthreads.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-5 h-5 text-primary" />
                      <span>123 Uniform Street, Fashion City, FC 12345</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
                      Business Hours
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-montserrat)" }}>
                    Send us a Message
                  </h3>
                  <form className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Input placeholder="Your Name" className="w-full" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Input placeholder="Your Email" type="email" className="w-full" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Input placeholder="Subject" className="w-full" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Textarea placeholder="Your Message" rows={4} className="w-full" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
                Skool Threads
              </h3>
              <p className="text-sm opacity-80 leading-relaxed" style={{ fontFamily: "var(--font-open-sans)" }}>
                Quality school uniforms designed for comfort, durability, and style. Trusted by parents and schools
                nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Shop All
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Sizing Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Size Chart
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm opacity-80">© 2024 Skool Threads. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
