import React from 'react';

const Contact = () => {
  const contactItems = [
    { label: 'Email', value: 'support@modeva.com' },
    { label: 'Phone', value: '+91 98765 43210' },
    { label: 'Instagram', value: '@modeva_official' },
    { label: 'Address', value: '3rd Floor, Urban Fashion Street, Mumbai, India' },
    { label: 'Availability', value: 'Available 24/7 for all your fashion needs.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#4D3B4C] mb-4">Contact Us</h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-12 text-sm sm:text-base">
        Whether you have a question about your order, returns, or just want to say hi we’re always here to help.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left justify-center text-gray-700 text-sm sm:text-base">
        {contactItems.map((item, index) => (
          <div key={index} className="text-center sm:text-center">
            <h3 className="text-[#4D3B4C] font-semibold text-lg mb-1">{item.label}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
