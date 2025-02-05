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
import { badgeVariants } from "@/components/ui/badge";
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
import { useFormatter } from "next-intl";
import PermissionGuard from "@/components/auth/permission-guard";

export default async function ({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { organisation, membership } = await getOrganisation(params.id);

  if (!organisation || !membership) {
    notFound();
  }

  return (
    <>
      <div className="max-w-4xl xl:max-w-5xl w-full mx-auto py-6 px-2 sm:px-6 lg:px-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Organisation Details
        </h1>

        <div className="space-y-6 p-2 sm:p-4">
          <OrganisationInfoCard
            organisation={organisation}
            membership={membership}
          />

          <BusinessProfileCard
            orgId={organisation.id}
            businessProfile={organisation?.businessProfile}
          />
        </div>
      </div>
    </>
  );
}

type GetOrganisationRT = AwaitedReturnType<typeof getOrganisation>;

type OrganisationInfoCardProps = {
  organisation: GetOrganisationRT["organisation"] & {};
  membership: GetOrganisationRT["membership"] & {};
};

type BusinessProfileCardProps = {
  businessProfile: any;
  orgId: string;
};

function OrganisationInfoCard({
  organisation,
  membership,
}: OrganisationInfoCardProps) {
  const format = useFormatter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Organisation Information
        </CardTitle>
        <CardDescription>Basic details about your organisation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <p>{organisation.name}</p>
          </div>
          <div>
            <Label>Owner</Label>
            <p>
              {organisation.creator.displayName} ({organisation.creator.email})
            </p>
          </div>
          <div className="space-y-1">
            <Label className="block">Business Type</Label>
            <span
              className={cn(
                badgeVariants({ variant: "outline" }),
                "lowercase py-0.5 text-white",
                organisation.businessType === "individual"
                  ? "bg-orange-600"
                  : "bg-rose-600"
              )}
            >
              {organisation.businessType}
            </span>
          </div>
          <div className="space-y-1">
            <Label>Role</Label>
            <p className="text-base text-orange-500">{membership.role.name}</p>
          </div>
          <div>
            <Label>Created At</Label>
            <p>
              {format.dateTime(organisation.createdAt, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <Label>Last Updated</Label>
            <p>{format.relativeTime(organisation.updatedAt)}</p>
          </div>

          <div>
            <Label>Members</Label>
            <p>{organisation.members.length}</p>
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
        <PermissionGuard
          action="CREATE"
          entity="ORGANIZATION"
          orgId={orgId}
          fallback={
            <>
              <p className="text-base font-bold uppercase">
                No Business Profile Exists
              </p>
              <p className="text-base font-bold uppercase">
                Only Admin Can Create Business Profile
              </p>
            </>
          }
        >
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
        </PermissionGuard>
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
