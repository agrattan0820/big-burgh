export const resources = [
  {
    name: "Allegheny Link Line for Overnight Shelter",
    address: "1 Smithfield Street",
    hours: "Mon - Fri: 8am - 7pm",
    phone: "1-866-730-2368",
    description:
      "For adult singles, the Link line will provide information on nearby shelters.  You will then need to reach out directly to a Shelter to get information about bed vacancies.   The Link line will not be reserving spaces or maintaining waiting lists for single shelters (including youth and veterans).  For families, the Link will continue to coordinate assignment to shelters.  The Link line can also offer referrals to a wide range of programs and services for those in distress (and help with completion of any needed paperwork).   When the Link line is closed, you will get a recorded message with options for those in particular need.",
    recommended_for:
      "For those who are experiencing or at risk of homelessness, those with a disability, or those over the age of 60 (with or without a disability)",
    requirements:
      "For shelter, you will be asked to provide social security number (not required), name, gender and age.",
    type: "shelter",
    latitude: 40.43713,
    longitude: -80.001,
  },
  {
    name: "COVID CRISIS: Tuesday Dinner - Outreached Arms",
    address: "320 Sixth Avenue",
    hours: "Mon - Fri: 8am - 7pm",
    phone: null,
    description:
      "For adult singles, the Link line will provide information on nearby shelters.  You will then need to reach out directly to a Shelter to get information about bed vacancies.   The Link line will not be reserving spaces or maintaining waiting lists for single shelters (including youth and veterans).  For families, the Link will continue to coordinate assignment to shelters.  The Link line can also offer referrals to a wide range of programs and services for those in distress (and help with completion of any needed paperwork).   When the Link line is closed, you will get a recorded message with options for those in particular need.",
    type: "food",
    latitude: 40.44174,
    longitude: -79.99898,
  },
  {
    name: "Educator Coordinator - 412 Youth Zone",
    address: "304 Wood St, 6th Floor",
    hours: null,
    phone: null,
    description:
      "For adult singles, the Link line will provide information on nearby shelters.  You will then need to reach out directly to a Shelter to get information about bed vacancies.   The Link line will not be reserving spaces or maintaining waiting lists for single shelters (including youth and veterans).  For families, the Link will continue to coordinate assignment to shelters.  The Link line can also offer referrals to a wide range of programs and services for those in distress (and help with completion of any needed paperwork).   When the Link line is closed, you will get a recorded message with options for those in particular need.",
    type: "job",
    latitude: 40.43906,
    longitude: -80.001152,
  },
  {
    name: "Art Expressions - 412 Youth Zone",
    address: "304 Wood St, 6th Floor",
    hours: null,
    phone: null,
    description:
      "For adult singles, the Link line will provide information on nearby shelters.  You will then need to reach out directly to a Shelter to get information about bed vacancies.   The Link line will not be reserving spaces or maintaining waiting lists for single shelters (including youth and veterans).  For families, the Link will continue to coordinate assignment to shelters.  The Link line can also offer referrals to a wide range of programs and services for those in distress (and help with completion of any needed paperwork).   When the Link line is closed, you will get a recorded message with options for those in particular need.",
    type: "activity",
    latitude: 40.43906,
    longitude: -80.001152,
  },
  {
    name: "Allegheny Link Line for Overnight Shelter",
    address: "1 Smithfield Street",
    hours: "Mon - Fri: 8am - 7pm",
    type: "shelter",
    latitude: 40.43713,
    longitude: -80.001,
  },
  {
    name: "COVID CRISIS: Tuesday Dinner - Outreached Arms",
    address: "320 Sixth Avenue",
    hours: "Mon - Fri: 8am - 7pm",
    type: "food",
    latitude: 40.44174,
    longitude: -79.99898,
  },
  {
    name: "Educator Coordinator - 412 Youth Zone",
    address: "304 Wood St, 6th Floor",
    type: "job",
    latitude: 40.43906,
    longitude: -80.001152,
  },
  {
    name: "Art Expressions - 412 Youth Zone",
    address: "304 Wood St, 6th Floor",
    type: "activity",
    latitude: 40.43906,
    longitude: -80.001152,
  },
  {
    name: "Allegheny Link Line for Overnight Shelter",
    address: "1 Smithfield Street",
    hours: "Mon - Fri: 8am - 7pm",
    type: "shelter",
    latitude: 40.43713,
    longitude: -80.001,
  },
  {
    name: "COVID CRISIS: Tuesday Dinner - Outreached Arms",
    address: "320 Sixth Avenue",
    hours: "Mon - Fri: 8am - 7pm",
    type: "food",
    latitude: 40.44174,
    longitude: -79.99898,
  },
  {
    name: "Educator Coordinator - 412 Youth Zone",
    address: "304 Wood St, 6th Floor",
    type: "job",
    latitude: 40.43906,
    longitude: -80.001152,
  },
  {
    name: "Art Expressions - 412 Youth Zone",
    address: "304 Wood St, 6th Floor",
    type: "activity",
    latitude: 40.43906,
    longitude: -80.001152,
  },
];

export type ResourcesType = typeof resources;

/** Used to grab type from resources data */
type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type ResourceItem = ArrElement<ResourcesType>;
