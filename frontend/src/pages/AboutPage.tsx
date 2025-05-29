
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Award, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About NutriHealth
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're passionate about helping you achieve optimal health through premium, 
          science-backed supplements and personalized nutrition solutions.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            At NutriHealth, we believe that everyone deserves access to high-quality, 
            effective supplements that support their unique health journey.
          </p>
          <p className="text-lg mb-6">
            Our mission is to bridge the gap between cutting-edge nutritional science 
            and everyday wellness, making premium health supplements accessible to all.
          </p>
          <Link to="/products">
            <Button size="lg">
              Shop Our Products
            </Button>
          </Link>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
            alt="Health and wellness"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                We source only the highest quality ingredients, rigorously tested for purity and potency.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety & Trust</h3>
              <p className="text-muted-foreground">
                All our products are manufactured in FDA-approved facilities with strict quality controls.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Science-Backed</h3>
              <p className="text-muted-foreground">
                Every formula is developed based on the latest nutritional research and clinical studies.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-muted-foreground">
                Your health and satisfaction are our top priorities. We're here to support your journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-muted/30 rounded-xl p-8 md:p-12 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Our Expert Team</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team combines decades of experience in nutrition science, product development, 
            and customer care to bring you the best in health supplements.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">Dr. S</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
              <p className="text-muted-foreground">Chief Nutritionist</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">Dr. M</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Michael Chen</h3>
              <p className="text-muted-foreground">Research Director</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">E.R</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emily Rodriguez</h3>
              <p className="text-muted-foreground">Quality Assurance Lead</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Health Journey?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of satisfied customers who trust NutriHealth for their wellness needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button size="lg">
              Browse Products
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
