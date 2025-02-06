import { cache } from "react";
import { checkPermission as realCheckPermission } from "./permission";

const checkPermission = cache(realCheckPermission);

export default checkPermission;
