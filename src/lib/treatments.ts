export interface Treatment {
  slug: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  introduction: string;
  sections: { title: string; paragraphs?: string[]; items?: string[] }[];
  questions: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
}
export const treatments: Treatment[] = [
  {
    slug: "cataract",
    label: "Cataract surgery",
    title: "Cataract care, focused on you.",
    description:
      "Specialist assessment, cataract surgery and intraocular lens options, with time to understand what matters to your vision.",
    image: "chrys-microscope",
    imageAlt: "Mr Dimitriou using an ophthalmic surgical microscope",
    introduction:
      "Mr Dimitriou’s practice includes routine and complex cataract surgery, small-incision phacoemulsification, femtosecond laser-assisted cataract surgery and intraocular lens implants. His clinical interests include cataract surgery in eyes with small pupils, narrow chambers, angle closure and co-existing glaucoma.",
    sections: [
      {
        title: "Understanding cataracts",
        paragraphs: [
          "A cataract makes the natural lens inside the eye cloudy. Surgery replaces that lens with an artificial implant. Whether and when to operate depends on how your vision affects daily life and the findings of your assessment.",
        ],
      },
      {
        title: "Choosing a lens",
        paragraphs: [
          "Mr Dimitriou’s published clinical profile lists multifocal, toric and extended depth-of-focus intraocular lenses alongside cataract surgery. Lens selection is part of an individual consultation. Ask about the options, trade-offs and whether you may still need spectacles.",
        ],
      },
      {
        title: "An informed decision",
        paragraphs: [
          "Before surgery, your eyes are examined and measured. The consultation should cover expected benefits, alternatives and complications, including infection, inflammation, retinal detachment and the possible need for further treatment. Your own risk profile and other eye conditions matter.",
        ],
      },
      {
        title: "Cataract and glaucoma together",
        paragraphs: [
          "Mr Dimitriou also assesses patients for combined cataract and glaucoma procedures. This requires a specific clinical decision; a combined operation is not automatically appropriate for everyone with both conditions.",
        ],
      },
    ],
    questions: [
      {
        question: "Does a cataract always need immediate surgery?",
        answer:
          "No. In adults, surgery may be considered when a cataract affects everyday life. Your specialist can discuss the timing and options after examining your eyes.",
      },
      {
        question: "Will I need glasses afterwards?",
        answer:
          "You may still need glasses after surgery. Discuss your visual priorities and the limitations of each lens option during your assessment.",
      },
      {
        question: "Where can I read more about the procedure?",
        answer:
          "The NHS cataract surgery guide linked below explains preparation, the operation, recovery and possible complications. Your care team will give instructions specific to you.",
      },
    ],
    sources: [
      {
        label: "NHS: cataract surgery",
        url: "https://www.nhs.uk/tests-and-treatments/cataract-surgery/",
      },
      {
        label: "Ramsay Health Care: Mr Dimitriou’s clinical interests",
        url: "https://www.ramsayhealth.co.uk/specialists/mr-chrys-dimitriou",
      },
    ],
  },
  {
    slug: "glaucoma",
    label: "Glaucoma care",
    title: "A long-term view of your eye health.",
    description:
      "Adult glaucoma assessment and care, from monitoring and eye drops to laser and surgery.",
    image: "chrys-consulting",
    imageAlt:
      "Mr Dimitriou in the consulting room beside a slit-lamp microscope",
    introduction:
      "Mr Dimitriou specialises in adult glaucoma. His practice covers medical, laser and surgical treatment, including minimally invasive glaucoma surgery and more conventional procedures for appropriate patients.",
    sections: [
      {
        title: "Understanding glaucoma",
        paragraphs: [
          "Glaucoma damages the optic nerve and often develops without noticeable early symptoms. It is commonly detected during an eye examination. Treatment cannot cure glaucoma but can help slow further damage.",
        ],
      },
      {
        title: "A range of treatment approaches",
        items: [
          "Monitoring and prescribed eye-drop therapy",
          "Selective laser trabeculoplasty (SLT)",
          "Laser iridotomy and iridoplasty",
          "Minimally invasive glaucoma surgery (MIGS)",
          "Trabeculectomy using the Moorfields Safe Surgery System",
          "Aqueous shunts, also called tube surgery",
        ],
      },
      {
        title: "Choosing an approach",
        paragraphs: [
          "Your treatment depends on the type of glaucoma, its effect on your sight and your individual circumstances. Benefits, risks, alternatives and ongoing medication requirements should be discussed before any procedure.",
        ],
      },
      {
        title: "Continuing care",
        paragraphs: [
          "Regular follow-up is important to assess your eyes and how well treatment is working. Follow your clinician’s advice about prescribed medication and appointments, including after laser treatment or surgery.",
        ],
      },
    ],
    questions: [
      {
        question: "Can I have glaucoma without noticing a change in vision?",
        answer:
          "Yes. Glaucoma often develops slowly and may have no early symptoms. Routine eye examinations help identify it.",
      },
      {
        question: "Is surgery the only treatment?",
        answer:
          "No. Management may include eye drops, laser or surgery. The appropriate approach follows an individual assessment.",
      },
      {
        question: "What should I do about sudden severe symptoms?",
        answer:
          "Sudden loss of sight or severe eye pain needs immediate assessment. Follow NHS guidance: go to A&E or call 999. Do not wait for a routine appointment.",
      },
    ],
    sources: [
      {
        label: "NHS: glaucoma",
        url: "https://www.nhs.uk/conditions/glaucoma/",
      },
      {
        label: "NHS: urgent advice for vision loss",
        url: "https://www.nhs.uk/conditions/vision-loss/",
      },
      {
        label: "ESNEFT: consultant profile",
        url: "https://www.esneft.nhs.uk/consultants/chrysostomos-chrys-d-dimitriou/",
      },
    ],
  },
  {
    slug: "migs",
    label: "Minimally invasive glaucoma surgery",
    title: "MIGS: understanding your options.",
    description:
      "Minimally invasive glaucoma surgery forms part of a wider range of treatments. The right choice depends on the individual eye.",
    image: "chrys-surgery",
    imageAlt:
      "Mr Dimitriou working in theatre with a surgical visualisation system",
    introduction:
      "Mr Dimitriou has a specialist interest in minimally invasive glaucoma surgery (MIGS), supported by a dedicated fellowship, clinical research and surgical education. His practice includes standalone glaucoma procedures and combined cataract and glaucoma surgery.",
    sections: [
      {
        title: "What does MIGS mean?",
        paragraphs: [
          "MIGS describes a group of procedures intended to improve drainage of fluid from the eye and lower eye pressure, often using small implants or instruments. Different procedures act on different drainage pathways.",
        ],
      },
      {
        title: "An individual surgical decision",
        paragraphs: [
          "MIGS is not suitable for every patient or type of glaucoma. The severity of disease, eye anatomy, pressure target and previous treatment all inform the discussion. Eye drops or another operation may still be needed.",
        ],
      },
      {
        title: "Clinical experience and devices",
        paragraphs: [
          "Mr Dimitriou’s original professional biography records experience with XEN45, iStent, KDB, PRESERFLO, HYDRUS, OMNI, iTRACK Advance, TrabEx+, MINIject, MiMS and ELiOS. This is a record of professional experience, not a guarantee that every device is currently offered or suitable for a particular patient. Confirm current options at consultation.",
        ],
      },
      {
        title: "Questions worth discussing",
        items: [
          "Why is this procedure being considered for my eye?",
          "What are the alternatives and their risks?",
          "What complications are possible?",
          "Will I still need drops, follow-up or further surgery?",
          "How much evidence is available for this particular procedure?",
        ],
      },
    ],
    questions: [
      {
        question: "Can MIGS be combined with cataract surgery?",
        answer:
          "Some procedures can be performed at the same time as cataract surgery. Mr Dimitriou assesses combined options where appropriate, after considering the needs of each eye.",
      },
      {
        question: "Does minimally invasive mean risk free?",
        answer:
          "No. Every operation carries risks. The potential benefits, possible complications and alternatives need to be discussed for the specific procedure being considered.",
      },
      {
        question: "Where can I read the research?",
        answer:
          "The Articles & Insights archive links to peer-reviewed papers and labels their study design. Research findings describe study populations and do not predict an individual result.",
      },
    ],
    sources: [
      {
        label: "Glaucoma UK: minimally invasive glaucoma surgery",
        url: "https://glaucoma.uk/about-glaucoma/treatments-surgery/migs/",
      },
      {
        label: "Ramsay Health Care: Mr Dimitriou’s clinical interests",
        url: "https://www.ramsayhealth.co.uk/specialists/mr-chrys-dimitriou",
      },
    ],
  },
  {
    slug: "laser",
    label: "Glaucoma laser treatment",
    title: "Targeted treatment. Considered choices.",
    description:
      "Laser treatment for glaucoma, including selective laser trabeculoplasty, iridotomy and iridoplasty.",
    image: "chrys-consulting",
    imageAlt: "Mr Dimitriou beside ophthalmic examination equipment",
    introduction:
      "Laser is one of the treatment approaches in Mr Dimitriou’s glaucoma practice. Different laser procedures have different purposes; the type of glaucoma and the structure of your eye help determine suitability.",
    sections: [
      {
        title: "Selective laser trabeculoplasty",
        paragraphs: [
          "SLT acts on the eye’s drainage tissue to help lower pressure. It is used in selected people with open-angle glaucoma or ocular hypertension. Treatment may reduce the need for drops, but does not guarantee that they can be stopped.",
        ],
      },
      {
        title: "Iridotomy and iridoplasty",
        paragraphs: [
          "These procedures may be used for narrow drainage angles or angle-closure glaucoma. Iridotomy creates a small opening in the iris; iridoplasty uses laser to change the position of peripheral iris tissue. Your clinician will explain the purpose of the proposed treatment.",
        ],
      },
      {
        title: "Benefits, risks and follow-up",
        paragraphs: [
          "Laser treatment still requires informed consent and follow-up. Temporary inflammation, blurred vision or a rise in eye pressure can occur. Further treatment may be needed. Continue prescribed medication unless your treating clinician tells you otherwise.",
        ],
      },
    ],
    questions: [
      {
        question: "Is this laser treatment to remove the need for glasses?",
        answer:
          "This page concerns glaucoma laser procedures. Their purpose is to manage the eye’s drainage or pressure, rather than to provide laser vision correction.",
      },
      {
        question: "Will I still need follow-up?",
        answer:
          "Yes. Your care team will arrange monitoring to check the response and will explain any medication and aftercare instructions.",
      },
      {
        question: "What are the alternatives?",
        answer:
          "Depending on the condition, options may include eye drops or surgery. Discuss the benefits and risks of each suitable option at your consultation.",
      },
    ],
    sources: [
      {
        label: "Glaucoma UK: laser treatments",
        url: "https://glaucoma.uk/about-glaucoma/treatments-surgery/laser/",
      },
      {
        label: "NICE NG81: glaucoma diagnosis and management",
        url: "https://www.nice.org.uk/guidance/ng81/chapter/Recommendations",
      },
      {
        label: "Cambridge University Hospitals: laser peripheral iridotomy",
        url: "https://www.cuh.nhs.uk/patient-information/laser-peripheral-iridotomy-treatment/",
      },
    ],
  },
];
