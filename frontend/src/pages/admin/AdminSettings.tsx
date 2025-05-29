
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [storeSettings, setStoreSettings] = useState({
    storeName: "NutriHealth",
    storeEmail: "support@nutrihealth.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Health Street, Wellness City, WC 12345",
    storeCurrency: "USD",
    enableReviews: true,
    enableWishlist: true,
    enableGuestCheckout: true,
    taxRate: 7.5,
    showOutOfStock: true,
  });

  const handleSettingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setStoreSettings({
      ...storeSettings,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleToggleChange = (checked: boolean, field: string) => {
    setStoreSettings({
      ...storeSettings,
      [field]: checked,
    });
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    toast({
      title: "Settings saved",
      description: "Your store settings have been updated successfully.",
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Basic information about your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.storeName}
                    onChange={(e) => handleSettingChange(e, "storeName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Support Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={(e) => handleSettingChange(e, "storeEmail")}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Support Phone</Label>
                  <Input
                    id="storePhone"
                    value={storeSettings.storePhone}
                    onChange={(e) => handleSettingChange(e, "storePhone")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCurrency">Currency</Label>
                  <Input
                    id="storeCurrency"
                    value={storeSettings.storeCurrency}
                    onChange={(e) => handleSettingChange(e, "storeCurrency")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Input
                  id="storeAddress"
                  value={storeSettings.storeAddress}
                  onChange={(e) => handleSettingChange(e, "storeAddress")}
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Store Features</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableReviews">Enable Product Reviews</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow customers to leave reviews on products
                    </p>
                  </div>
                  <Switch
                    id="enableReviews"
                    checked={storeSettings.enableReviews}
                    onCheckedChange={(checked) =>
                      handleToggleChange(checked, "enableReviews")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableWishlist">Enable Wishlist</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow customers to save products to a wishlist
                    </p>
                  </div>
                  <Switch
                    id="enableWishlist"
                    checked={storeSettings.enableWishlist}
                    onCheckedChange={(checked) =>
                      handleToggleChange(checked, "enableWishlist")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableGuestCheckout">
                      Enable Guest Checkout
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow customers to checkout without creating an account
                    </p>
                  </div>
                  <Switch
                    id="enableGuestCheckout"
                    checked={storeSettings.enableGuestCheckout}
                    onCheckedChange={(checked) =>
                      handleToggleChange(checked, "enableGuestCheckout")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showOutOfStock">
                      Show Out of Stock Products
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Display products that are currently out of stock
                    </p>
                  </div>
                  <Switch
                    id="showOutOfStock"
                    checked={storeSettings.showOutOfStock}
                    onCheckedChange={(checked) =>
                      handleToggleChange(checked, "showOutOfStock")
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure your payment methods and options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Payment settings configuration will be implemented in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure your shipping options and rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Shipping settings configuration will be implemented in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Notification settings configuration will be implemented in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
