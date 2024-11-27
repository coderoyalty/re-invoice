import { notFound } from "next/navigation";
import { getOrganisation } from "./actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { formatDate, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AwaitedReturnType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BusinessProfileForm } from "./form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function ({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const organisation = await getOrganisation(params.id);

  if (!organisation) {
    notFound();
  }
  return (
    <>
      <div className="max-w-5xl mx-auto py-6 px-1 sm:px-4 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Organisation Details
        </h1>

        <div className="space-y-6 p-2 sm:p-4">
          <OrganisationInfoCard organisation={organisation} />

          <BusinessProfileCard
            orgId={organisation.id}
            businessProfile={organisation.businessProfile}
          />
        </div>
      </div>
    </>
  );
}

type OrganisationInfoCardProps = {
  organisation: NonNullable<AwaitedReturnType<typeof getOrganisation>>;
};

type BusinessProfileCardProps = {
  businessProfile: NonNullable<
    AwaitedReturnType<typeof getOrganisation>
  >["businessProfile"];
  orgId: string;
};

function OrganisationInfoCard({ organisation }: OrganisationInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organisation Information</CardTitle>
        <CardDescription>Basic details about your organisation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <p className="text-lg">{organisation.name}</p>
          </div>
          <div>
            <Label>Owner</Label>
            <p className="text-lg">
              {organisation.creator.displayName} ({organisation.creator.email})
            </p>
          </div>
          <div className="space-y-1">
            <Label>Business Type</Label>
            <p>
              <Badge
                className={cn(
                  "text-base capitalize py-0.5",
                  organisation.businessType === "individual"
                    ? "bg-orange-600"
                    : "bg-rose-600"
                )}
              >
                {organisation.businessType}
              </Badge>
            </p>
          </div>
          <div>
            <Label>Created At</Label>
            <p className="text-lg">
              {formatDate(organisation.createdAt, "yyyy/MM/dd")}
            </p>
          </div>
          <div>
            <Label>Last Updated</Label>
            <p className="text-lg">
              {formatDistance(new Date(), organisation.updatedAt)}
            </p>
          </div>

          <div>
            <Label>Members</Label>
            <p className="text-lg">{organisation.members.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BusinessProfileCard({
  businessProfile,
  orgId,
}: BusinessProfileCardProps) {
  if (!businessProfile) {
    return (
      <div className="mx-auto flex flex-col gap-2 h-[300px] max-w-2xl items-center justify-center rounded-md border-2 border-dashed text-sm">
        <p className="text-base font-bold uppercase">
          Haven't created business profile yet.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Business Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-3xl sm:text-2xl">
                Business Profile
              </DialogTitle>
              <DialogDescription>
                Enter your business details below
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-96 px-3 sm:px-6 py-4 flex w-full">
              <BusinessProfileForm orgId={orgId} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
        <CardDescription>Your business profile information</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="organisationName">Organisation Name</Label>
            <Input readOnly defaultValue={businessProfile.organisationName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input readOnly defaultValue={businessProfile.websiteUrl || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input readOnly defaultValue={businessProfile.firstName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              readOnly
              id="lastName"
              name="lastName"
              defaultValue={businessProfile.lastName}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input
              readOnly
              id="emailAddress"
              name="emailAddress"
              type="email"
              defaultValue={businessProfile.emailAddress}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            readOnly
            id="addressLine1"
            name="addressLine1"
            defaultValue={businessProfile.addressLine1}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            readOnly
            id="addressLine2"
            name="addressLine2"
            defaultValue={businessProfile.addressLine2 || ""}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              readOnly
              id="city"
              name="city"
              defaultValue={businessProfile.city}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              readOnly
              id="state"
              name="state"
              defaultValue={businessProfile.state}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              readOnly
              id="postalCode"
              name="postalCode"
              defaultValue={businessProfile.postalCode}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              readOnly
              id="country"
              name="country"
              defaultValue={businessProfile.country}
            />
          </div>
        </div>

        {/* <Button type="submit" className="w-full sm:w-auto">
          Update Business Profile
        </Button> */}
      </CardContent>
    </Card>
  );
}
