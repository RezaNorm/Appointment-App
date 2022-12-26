import { BusinessUnitType, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Unit = {
  businessUnitName: String;
  phoneNumber: String;
  mobileNumber: String;
  aboutUs: String;
  contactUs: String;
  address: String;
  businessUnitType: Partial<BusinessUnitType>
};

async function main() {
  const groups = await prisma.serviceGroupName.findMany({
    where: {
      groupName: 'ابرو و اصلاح' || 'بلیدینگ' || 'پوست' || 'ناخن',
    },
  });

  const existingUnit = await prisma.businessUnit.findMany({
    where: {
      businessUnitName: 'سالن زیبایی مسعود',
    },
  });

  if (!existingUnit.length) {
    const businessUnitType = await prisma.businessUnitType.create({
      data: {
        businessUnitTypeName: 'سالن زیبایی',
      },
    });

    console.log(businessUnitType);
    console.log(typeof businessUnitType);

    const businessUnit = {
      businessUnitName: 'سالن زیبایی مسعود',
      phoneNumber: '000000000',
      businessWebsite: "www.google.com",
      mobileNumber: '09170562324',
      aboutUs: 'سالن زیبایی مسعود واقع در شیراز میزبان بیبی های ناز می باشد',
      contactUs: '000000000',
      address: 'شیراز خیابان راز کوچه دوم سمت راست',
      businessUnitType: {
        connect: {
          id: businessUnitType.id,
        },
      },
    };

    const business_unit = await prisma.businessUnit.create({
      data: businessUnit,
    });

    const serviceGroups = [
      {
        groupName: 'ابرو و اصلاح',
        businessUnitId: business_unit.id,
      },
      {
        groupName: 'بلیدینگ',
        businessUnitId: business_unit.id,
      },
      {
        groupName: 'پوست',
        businessUnitId: business_unit.id,
      },
      {
        groupName: 'ناخن',
        businessUnitId: business_unit.id,
      },
    ];

    const sgn = await prisma.serviceGroupName.createMany({
      data: serviceGroups,
    });

    await prisma.businessDays.create({
      data: {
        openFrom: '2020-03-19T14:21:00+02:00',
        openUntil: '2020-03-19T14:21:00+02:00',
        businessUnitId: business_unit.id,
      },
    });

    await prisma.user.createMany({
      data: [
        {
          name: 'سارا',
          mobileNumber: '00000000',
          startWorkTime: '2020-03-19T14:21:00+02:00',
          offWorkTime: '2020-03-19T14:21:00+02:00',
          serviceGroupId: 1,
          role: 'Employee',
          businessUnitId: business_unit.id,
        },
        {
          name: 'نگین',
          mobileNumber: '00000000',
          startWorkTime: '2020-03-19T14:21:00+02:00',
          offWorkTime: '2020-03-19T14:21:00+02:00',
          serviceGroupId: 2,
          role: 'Employee',
          businessUnitId: business_unit.id,
        },
        {
          name: 'مسعود',
          mobileNumber: '00000000',
          startWorkTime: '2020-03-19T14:21:00+02:00',
          offWorkTime: '2020-03-19T14:21:00+02:00',
          serviceGroupId: 3,
          role: 'Manager',
          businessUnitId: business_unit.id,
        },
      ],
    });

    await prisma.service.createMany({
      data: [
        {
          serviceName: 'ابرو',
          serviceFee: 10000,
          serviceGroupId: 1,
        },
        {
          serviceName: 'اصلاح با بند',
          serviceFee: 10000,
          serviceGroupId: 1,
        },
        {
          serviceName: 'وکس صورت و ابرو',
          serviceFee: 30000,
          serviceGroupId: 3,
        },
        {
          serviceName: 'اسکالپ',
          serviceFee: 200000,
          serviceGroupId: 2,
        },
        {
          serviceName: 'بلید ابرو',
          serviceFee: 200000,
          serviceGroupId: 2,
        },
        {
          serviceName: 'اسکوم تراپی',
          serviceFee: 100000,
          serviceGroupId: 2,
        },
        {
          serviceName: 'فیشال کلاسیک',
          serviceFee: 100000,
          serviceGroupId: 3,
        },
        {
          serviceName: 'اسپا پا با جلیش',
          serviceFee: 70000,
          serviceGroupId: 4,
        },
        {
          serviceName: 'اسپا دست بدون جلیش',
          serviceFee: 50000,
          serviceGroupId: 4,
        },
      ],
    });

    if (groups.length < 1) {
      console.log('create many return ', sgn);
    }
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
