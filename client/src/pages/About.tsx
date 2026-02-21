import Loading from "@/components/flashPages/Loading";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CircularGallery from "@/components/ui/CircularGallery";
// import TextType from "@/components/ui/TextType";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  ClipboardCheck,
  // Utensils,
  // MessageSquare,
  // Target,
  Eye,
  Building2,
  // QrCode,
  // CreditCard,
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Jaydip Jadhav",
      role: "Team Lead | Full-Stack Developer | AI & Blockchain Integration",
      contributions: [
        "Project architecture design",
        "Backend development (Node.js, Express)",
        "Database design (MongoDB)",
        "AI-based smart decision integration",
      ],
      image: "/team/jaydip.png",
    },
    {
      name: "Aditya Mulik",
      role: "ML Researcher | Model Development & Paper Publication",
      contributions: [
        "React UI development",
        "Responsive design implementation",
        "Dashboard interface creation",
        "User experience improvements",
      ],
      image: "/team/adityaM.png",
    },
    {
      name: "Aditya Tingare",
      role: "QA & Documentation Lead | Testing & System Validation",
      contributions: [
        "REST API development",
        "Admin panel functionality",
        "Database integration",
        "Data validation & security",
      ],
      image: "/team/adityaT.jpeg",
    },
    {
      name: "Vivek Virkar",
      role: "ML Researcher | Model Development & Paper Publication",
      contributions: [
        "System testing & debugging",
        "Feature validation",
        "Project documentation",
        "Presentation preparation",
      ],
      image: "/team/member4.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Loading />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-background py-24">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                About Smart Mess System
                {/* <TextType 
                text={[" About", "Smart", "Mess System"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              /> */}
              </h1>
              <p className="text-lg max-w-xl mx-auto md:mx-0 opacity-90">
                A modern web-based solution that transforms hostel and mess
                management into a seamless, automated, and transparent
                experience. Our system centralizes operations, ensures accuracy
                in attendance and meal tracking, and provides authentic feedback
                channels for students and administrators alike.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src="about.png"
                alt="Smart Mess System"
                className="w-full max-w-md drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Mission */}
        {/* <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-7 h-7 text-blue-600" />
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              To bring <strong>automation, accuracy, and transparency</strong> to
              mess operations, ensuring a smooth experience for both students
              and administrators.
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Our Mission"
            className="w-72 mx-auto"
          />
        </section> */}

        {/* Circular Gallery Showcase */}
        <section className="bg-background/80 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Explore Smart Mess System
          </h2>
          <div className="relative mx-auto w-full h-[400px] sm:h-[500px] md:h-[600px]">
            <CircularGallery
              bend={3}
              textColor="#3949AB"
              borderRadius={0.09}
              scrollEase={0.05}
            />
          </div>
        </section>

        {/* Features */}
        {/* <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
              <ClipboardCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Auto Attendance</h3>
              <p>
                Smart tracking system to record and verify student attendance
                without manual errors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Centralized System</h3>
              <p>
                A unified platform for admins and students to manage mess
                activities in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
              <Utensils className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Meal Details</h3>
              <p>Easy access to daily menus, meal timings, and real-time updates.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
              <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Authentic Feedback</h3>
              <p>
                Transparent feedback system for students to share opinions and
                help improve food quality.
              </p>
            </div>
          </div>

        </section> */}

        {/* Benefits */}
        {/* <section className="bg-background py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Who Benefits?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-xl transition">
              <Users className="w-14 h-14 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Students</h3>
              <p>
                Real-time access to meal details, attendance tracking, and a
                voice through feedback.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-xl transition">
              <ClipboardCheck className="w-14 h-14 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Mess Admins</h3>
              <p>
                Reduced paperwork, accurate records, and centralized management
                for smoother operations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-xl transition">
              <Building2 className="w-14 h-14 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Institutions</h3>
              <p>
                Improved efficiency, reduced costs, and higher student
                satisfaction through smart management.
              </p>
            </div>
          </div>
        </section> */}

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Who Benefits?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-card/50 border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                {/* <QrCode className="h-12 w-12 text-food-primary mx-auto" /> */}
                <Users className="w-14 h-14 text-blue-600 mx-auto mb-4" />
                <CardTitle>Students</CardTitle>
                <CardDescription>
                  Real-time access to meal details, attendance tracking, and a
                  voice through feedback.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <ClipboardCheck className="w-14 h-14 text-green-600 mx-auto mb-4" />
                <CardTitle>Mess Admins</CardTitle>
                <CardDescription>
                  Reduced paperwork, accurate records, and centralized
                  management for smoother operations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Building2 className="w-14 h-14 text-indigo-600 mx-auto mb-4" />
                <CardTitle>Institutions</CardTitle>
                <CardDescription>
                  Improved efficiency, reduced costs, and higher student
                  satisfaction through smart management.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Vision Section */}
        <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-indigo-500" />
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed">
              We aim to build a{" "}
              <strong className="">
                fully automated and intelligent mess management system
              </strong>
              , ensuring accuracy, transparency, and efficiency. Our future
              roadmap expands into{" "}
              <span className="font-semibold">mobile apps</span>,
              <span className="font-semibold"> digital payments</span>, and
              <span className="font-semibold">
                {" "}
                AI-powered meal demand prediction
              </span>
              , making hostel and mess management smarter than ever.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Vision"
              className="w-80 drop-shadow-2xl"
            />
          </div>
        </section>

        {/* out team */}

        <section className="relative py-28 bg-background">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-24">
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
        Meet the Team
      </h2>
      <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
        The passionate minds building intelligent and scalable solutions.
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="group relative text-center p-10 rounded-3xl
                     bg-card border border-border
                     transition-all duration-500
                     hover:-translate-y-1 hover:shadow-xl"
        >

          {/* Refined Gradient Ring */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-primary/70 to-primary/30">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover
                             transition duration-500 ease-out
                             group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Name - Professional Font Style */}
          <h3
            className="text-xl font-semibold tracking-wide text-foreground
                       transition-colors duration-300
                       group-hover:text-primary"
          >
            {member.name}
          </h3>

          {/* Role */}
          <p
            className="mt-3 text-xs font-medium tracking-[0.25em]
                       uppercase text-muted-foreground"
          >
            {member.role}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Contact Section */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Contact Info */}
            <div>
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg mb-6">
                Have questions, feedback, or suggestions? We’d love to hear from
                you. Reach out and let’s make mess management smarter together.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12H8m0 0l4-4m-4 4l4 4"
                    />
                  </svg>
                  <span>Email: support@smartmess.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m6 4h6m-3-3v6m-6 4h6m-3-3v6"
                    />
                  </svg>
                  <span>Phone: +91 12345 67890</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 12l4.243-4.243M6.343 7.343L10.586 12l-4.243 4.243"
                    />
                  </svg>
                  <span>Location: Pune, India</span>
                </li>
              </ul>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-900">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
