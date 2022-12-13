import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const groups = await prisma.serviceGroupName.findMany({
    where: {
      groupName: 'ابرو و اصلاح' || 'بلیدینگ' || 'پوست' || 'ناخن',
    },
  });

  let get: Prisma.ServiceCreateNestedManyWithoutServiceGroupInput;
  const serviceGroups: Prisma.ServiceGroupNameCreateInput[] = [
    {
      groupName: 'ابرو و اصلاح'
    },
    {
      groupName: 'بلیدینگ'
    },
    {
      groupName: 'پوست'
    },
    {
      groupName: 'ناخن'
    },
  ];

  if (groups.length < 1) {
    await prisma.serviceGroupName.createMany({
      data: serviceGroups,
    });

    // await prisma.service.createMany({
    //   data: [
    //     {
    //       serviceName: 'ابرو',
    //       serviceFee: 10000,
    //       serviceGroupId: 1,
    //     },
    //     {
    //       serviceName: 'اصلاح با بند',
    //       serviceFee: 10000,
    //       serviceGroupId: 1,
    //     },
    //     {
    //       serviceName: 'وکس صورت و ابرو',
    //       serviceFee: 30000,
    //       serviceGroupId: 1,
    //     },
    //     {
    //       serviceName: 'اسکالپ',
    //       serviceFee: 200000,
    //       serviceGroupId: 2,
    //     },
    //     {
    //       serviceName: 'بلید ابرو',
    //       serviceFee: 200000,
    //       serviceGroupId: 2,
    //     },
    //     {
    //       serviceName: 'اسکوم تراپی',
    //       serviceFee: 100000,
    //       serviceGroupId: 3,
    //     },
    //     {
    //       serviceName: 'فیشال کلاسیک',
    //       serviceFee: 100000,
    //       serviceGroupId: 3,
    //     },
    //     {
    //       serviceName: 'اسپا پا با جلیش',
    //       serviceFee: 70000,
    //       serviceGroupId: 4,
    //     },
    //     {
    //       serviceName: 'اسپا دست بدون جلیش',
    //       serviceFee: 50000,
    //       serviceGroupId: 4,
    //     },
    //   ],
    // });
  }

  const existingUnit = await prisma.businessUnit.findMany({
    where: {
      businessUnitName: 'سالن زیبایی مسعود',
    },
  });

  const businessUnit: Prisma.BusinessUnitCreateInput = {
    businessUnitName: 'سالن زیبایی مسعود',
    phoneNumber: '000000000',
    mobileNumber: '09170562324',
    aboutUs: 'سالن زیبایی مسعود واقع در شیراز میزبان بیبی های ناز می باشد',
    contactUs: '000000000',
    address: 'شیراز خیابان راز کوچه دوم سمت راست',
    businessUnitType: {
      create: {
        businessUnitTypeName: 'سالن زیبایی',
      },
    },
    // BusinessDays: {
    //   create: {
    //     openFrom: '2020-03-19T14:21:00+02:00',
    //     openUntil: '9:00 pm',
    //   },
    // },
    // Employee: {
    //   createMany: {
    //     data: [
    //       {
    //         employeeName: 'سارا',
    //         mobileNumber: '00000000',
    //         startWorkTime: '8:00 am',
    //         offWorkTime: '5:00 pm',
    //         serviceGroupId: 1,
    //         role: 'Employee',
    //       },
    //       {
    //         employeeName: 'نگین',
    //         mobileNumber: '00000000',
    //         startWorkTime: '10:00 am',
    //         offWorkTime: '6:00 pm',
    //         serviceGroupId: 1,
    //         role: 'Employee',
    //       },
    //       {
    //         employeeName: 'مسعود',
    //         mobileNumber: '00000000',
    //         startWorkTime: '12:00 am',
    //         offWorkTime: '8:00 pm',
    //         serviceGroupId: 2,
    //         role: 'Manager',
    //       },
    //     ],
    //   },
    // },
  };

  if (existingUnit.length < 1) {
    const business_unit = await prisma.businessUnit.create({
      data: businessUnit,
    });

    await prisma.businessDays.create({
      data: {
        openFrom: '2020-03-19T14:21:00+02:00',
        openUntil: '2020-03-19T14:21:00+02:00',
        businessUnitId: business_unit.id,
      },
    });

    await prisma.employee.createMany({
      data: [
        {
          employeeName: 'سارا',
          mobileNumber: '00000000',
          startWorkTime: '2020-03-19T14:21:00+02:00',
          offWorkTime: '2020-03-19T14:21:00+02:00',
          serviceGroupId: 14,
          role: 'Employee',
          businessUnitId: business_unit.id,
        },
        {
          employeeName: 'نگین',
          mobileNumber: '00000000',
          startWorkTime: '2020-03-19T14:21:00+02:00',
          offWorkTime: '2020-03-19T14:21:00+02:00',
          serviceGroupId: 13,
          role: 'Employee',
          businessUnitId: business_unit.id,
        },
        {
          employeeName: 'مسعود',
          mobileNumber: '00000000',
          startWorkTime: '2020-03-19T14:21:00+02:00',
          offWorkTime: '2020-03-19T14:21:00+02:00',
          serviceGroupId: 12,
          role: 'Manager',
          businessUnitId: business_unit.id,
        },
      ],
    });
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
