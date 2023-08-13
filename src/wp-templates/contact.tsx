// import { GetContactPageQuery } from '@/__generated__/graphql';
// import { FaustTemplate } from '@faustwp/core';
// import { gql } from '@/__generated__';
// import { gql as apolloGql, useMutation } from '@apollo/client';
// import { motion } from 'framer-motion';
// import { SpinnerIcon } from '@/components/icons';
// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

// import {
//   Button,
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   Input,
//   RadioGroup,
//   RadioGroupItem,
//   RawHtml,
//   SiteHead,
//   Textarea,
// } from '@/components';

// const SUBMIT_FORM = apolloGql`
//   mutation SubmitForm($databaseId: ID!, $fieldValues: [FormFieldValuesInput]!) {
//     submitGfForm(input: { id: $databaseId, fieldValues: $fieldValues }) {
//       confirmation {
//         message
//       }
//       errors {
//         id
//         message
//       }
//     }
//   }
// `;

// const FormSchema = z.object({
//   firstName: z.string().max(30, 'Must be shorter than 30 characters'),
//   lastName: z.string().max(30, 'Must be shorter than 30 characters'),
//   emailAddress: z
//     .string()
//     .min(1, { message: 'This field has to be filled.' })
//     .email('This is not a valid email.'),
//   phoneNumber: z
//     .string()
//     .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'Invalid number'),
//   referralSource: z.literal('family-member' || 'social-media'),
//   message: z.string().max(120, 'Must be shorter than 120 characters'),
// });

// const Template: FaustTemplate<GetContactPageQuery> = (props) => {
//   const [confirmationMessage, setConfirmationMessage] = useState('');

//   const [mutateFunction, { data, loading, error }] = useMutation(SUBMIT_FORM);

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   });

//   async function onFormSubmit(data: z.infer<typeof FormSchema>) {
//     try {
//       let response = await mutateFunction({
//         variables: {
//           databaseId: 1,
//           fieldValues: [
//             {
//               id: 1,
//               nameValues: {
//                 first: data.firstName,
//                 last: data.lastName,
//               },
//             },
//             {
//               id: 5,
//               emailValues: {
//                 value: data.emailAddress,
//               },
//             },
//             {
//               id: 6,
//               value: data.phoneNumber,
//             },
//             {
//               id: 11,
//               value: data.message,
//             },
//           ],
//         },
//       });

//       const confirmationMessage = response?.data?.submitGfForm?.confirmation?.message;

//       setConfirmationMessage(confirmationMessage);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // Loading state for previews
//   if (props.loading) {
//     return <>Loading...</>;
//   }

//   // Data from CMS
//   const { fullHead } = props.data.page.seo;
//   const { heroSection } = props.data.page.contact;

//   return (
//     <>
//       <SiteHead>
//         <RawHtml html={fullHead} />
//       </SiteHead>

//       <motion.div
//         initial={{ opacity: 0, height: 0 }}
//         animate={{
//           opacity: confirmationMessage ? 1 : 0,
//           height: confirmationMessage ? 'auto' : 0,
//         }}
//         className="prose"
//         dangerouslySetInnerHTML={{ __html: confirmationMessage }}
//       ></motion.div>

//       <motion.div
//         initial={{ opacity: 1, height: 'auto' }}
//         animate={{
//           opacity: confirmationMessage ? 0 : 1,
//           height: confirmationMessage ? 0 : 'auto',
//         }}
//       >
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onFormSubmit)} className="">
//             <div className="flex w-full flex-col items-start justify-center gap-6">
//               <div className="grid w-full grid-cols-2 gap-3">
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem className="w-full">
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem className="w-full">
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <FormField
//                 control={form.control}
//                 name="emailAddress"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="phoneNumber"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Phone</FormLabel>
//                     <FormControl>
//                       <Input placeholder="" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="referralSource"
//                 render={({ field }) => (
//                   <FormItem className="space-y-3">
//                     <FormLabel>How did you here about us?</FormLabel>
//                     <FormControl>
//                       <RadioGroup
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                         className="flex space-x-2"
//                       >
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value="family-member" />
//                           </FormControl>
//                           <FormLabel className="font-normal">Family member</FormLabel>
//                         </FormItem>

//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value="social-media" />
//                           </FormControl>
//                           <FormLabel className="font-normal">Social media</FormLabel>
//                         </FormItem>
//                       </RadioGroup>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="message"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Anything else we can help you with?</FormLabel>
//                     <FormControl>
//                       <Textarea placeholder="" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button type="submit" className="ml-auto">
//                 Submit
//                 <motion.div
//                   className="-mr-3 ml-3"
//                   initial={{ opacity: 0, width: 0 }}
//                   animate={{
//                     opacity: loading ? 1 : 0,
//                     width: loading ? 'auto' : 0,
//                   }}
//                 >
//                   <SpinnerIcon />
//                 </motion.div>
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </motion.div>
//     </>
//   );
// };

// Template.variables = ({ databaseId }, ctx) => {
//   return {
//     databaseId,
//     asPreview: ctx?.asPreview,
//   };
// };

// Template.query = gql(`
//   query GetContactPage($databaseId: ID!, $asPreview: Boolean = false) {
//     page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
//       title
//       content
//       contact {
//         heroSection {
//           heading
//           body
//         }
//       }
//       seo {
//         fullHead
//       }
//     }
//     generalSettings {
//       title
//       description
//     }
//     primaryMenuItems: menuItems(where: { location: PRIMARY }) {
//       nodes {
//         id
//         uri
//         path
//         label
//         parentId
//         cssClasses
//         menu {
//           node {
//             name
//           }
//         }
//       }
//     }
//   }
// `);

// export default Template;
