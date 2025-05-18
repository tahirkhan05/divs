
import { useState } from "react";
import { 
  Building, 
  Calendar, 
  MapPin, 
  Briefcase, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BusinessVerificationFlow() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  
  const locations = [
    {
      id: "loc1",
      name: "Downtown Identity Center",
      address: "123 Market Street, San Francisco, CA",
      distance: "1.2 miles away",
      availability: "High"
    },
    {
      id: "loc2",
      name: "Blockchain Verification Hub",
      address: "456 Montgomery St, San Francisco, CA",
      distance: "2.4 miles away",
      availability: "Medium"
    },
    {
      id: "loc3",
      name: "Secure ID Partners",
      address: "789 Mission St, San Francisco, CA",
      distance: "3.1 miles away",
      availability: "Low"
    },
  ];
  
  const availableDates = ["May 20, 2025", "May 21, 2025", "May 22, 2025", "May 23, 2025"];
  const availableTimes = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "4:45 PM"];

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setSelectedTab("date");
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTab("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setSelectedTab("confirmation");
  };

  const handleBookAppointment = () => {
    setAppointmentBooked(true);
    setSelectedTab("complete");
  };

  const resetBooking = () => {
    setSelectedLocation(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setAppointmentBooked(false);
    setSelectedTab("overview");
  };

  return (
    <div className="max-w-2xl mx-auto py-6 animate-fade-in">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="location" disabled={!selectedTab || selectedTab === "overview"}>Location</TabsTrigger>
          <TabsTrigger value="date" disabled={!selectedLocation}>Date</TabsTrigger>
          <TabsTrigger value="time" disabled={!selectedDate}>Time</TabsTrigger>
          <TabsTrigger value="confirmation" disabled={!selectedTime}>Confirm</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Business Verification</CardTitle>
                <CardDescription>
                  Complete your identity verification with an in-person business verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900/30 text-identity-orange border-identity-orange">
                      Required for 100% Verification
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your identity is currently 80% verified based on document and biometric verification. 
                    To achieve 100% verification status and unlock all platform features, you need to 
                    complete an in-person business verification.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">What to Expect</h3>
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Visit a Partner Location</h4>
                        <p className="text-sm text-muted-foreground">
                          Schedule an appointment at one of our authorized business partners
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Bring Required Documents</h4>
                        <p className="text-sm text-muted-foreground">
                          Government-issued photo ID and proof of address
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Complete Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          A representative will verify your identity in person
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => setSelectedTab("location")} className="w-full">
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Select a Location</CardTitle>
                <CardDescription>
                  Choose a business partner location for your in-person verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {locations.map((location) => (
                    <div 
                      key={location.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedLocation === location.id 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => handleLocationSelect(location.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-muted p-2 mt-0.5">
                            <Store className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium">{location.name}</h4>
                            <p className="text-sm text-muted-foreground">{location.address}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {location.distance}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  location.availability === "High" 
                                    ? "bg-green-100 text-identity-green" 
                                    : location.availability === "Medium"
                                    ? "bg-yellow-100 text-identity-orange"
                                    : "bg-red-100 text-destructive"
                                }`}
                              >
                                {location.availability} Availability
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setSelectedTab("overview")}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => selectedLocation && setSelectedTab("date")}
                    disabled={!selectedLocation}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="date">
            <Card>
              <CardHeader>
                <CardTitle>Select a Date</CardTitle>
                <CardDescription>
                  Choose your preferred appointment date
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {availableDates.map((date) => (
                    <div 
                      key={date}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedDate === date 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => handleDateSelect(date)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-muted p-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setSelectedTab("location")}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => selectedDate && setSelectedTab("time")}
                    disabled={!selectedDate}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="time">
            <Card>
              <CardHeader>
                <CardTitle>Select a Time</CardTitle>
                <CardDescription>
                  Choose your preferred appointment time on {selectedDate}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {availableTimes.map((time) => (
                    <div 
                      key={time}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTime === time 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-muted p-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setSelectedTab("date")}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => selectedTime && setSelectedTab("confirmation")}
                    disabled={!selectedTime}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="confirmation">
            <Card>
              <CardHeader>
                <CardTitle>Confirm Your Appointment</CardTitle>
                <CardDescription>
                  Review your business verification appointment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  {selectedLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">{locations.find(loc => loc.id === selectedLocation)?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {locations.find(loc => loc.id === selectedLocation)?.address}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedDate && selectedTime && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">{selectedDate}, {selectedTime}</h4>
                        <p className="text-sm text-muted-foreground">
                          Please arrive 10 minutes before your appointment time
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Required Documents</h4>
                      <ul className="text-sm text-muted-foreground list-disc pl-4">
                        <li>Government-issued photo ID (passport or driver's license)</li>
                        <li>Proof of address (utility bill, bank statement)</li>
                        <li>QR code from your DIVS mobile app</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setSelectedTab("time")}>
                    Back
                  </Button>
                  <Button onClick={handleBookAppointment}>
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="complete">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Confirmed</CardTitle>
                <CardDescription>
                  Your business verification appointment is scheduled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-6">
                    <CheckCircle className="h-12 w-12 text-identity-green" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">Appointment Booked!</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                    Your business verification appointment has been scheduled. A confirmation 
                    has been sent to your email and phone.
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  {selectedLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">{locations.find(loc => loc.id === selectedLocation)?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {locations.find(loc => loc.id === selectedLocation)?.address}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedDate && selectedTime && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">{selectedDate}, {selectedTime}</h4>
                        <p className="text-sm text-muted-foreground">Confirmation #DIVS-BV-2584</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" onClick={resetBooking} className="flex-1">
                    Done
                  </Button>
                  <Button className="flex-1">
                    Add to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
