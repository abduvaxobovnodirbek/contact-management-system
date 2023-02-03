interface desc {
    first: string;
    second: string;
    third: string;
  }
  
  export const descriptions: desc = {
    first: "Add Title and Review",
    second: "Other Features",
    third: "Demo visualization",
  };
  
  export const steps = [
    {
      title: "Step 1",
      description: descriptions.first,
    },
    {
      title: "Step 2",
      description: descriptions.second,
    },
    {
      title: "Step 3",
      description: descriptions.third,
    },
  ];
  
  export const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));
  