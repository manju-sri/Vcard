import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VCard = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        phone: '',
        fax: '',
        email: '',
        company: '',
        job: '',
        street: '',
        city: '',
        zipcode: '',
        state: '',
        country: '',
        website: ''
    });

    const [qrcode, setQRCode] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleGenerateQRCode = () => {
        const newErrors = {};

        if (!formData.firstname) newErrors.firstname = 'Please enter your first name.';
        if (!formData.lastname) newErrors.lastname = 'Please enter your last name.';
        if (!formData.mobile) newErrors.mobile = 'Please enter your mobile number.';
        if (!formData.email) newErrors.email = 'Please enter your email address.';
        if (!formData.company) newErrors.company = 'Please enter your company name.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${formData.firstname} ${formData.lastname}
TEL;TYPE=CELL:${formData.mobile}
TEL;TYPE=WORK,VOICE:${formData.phone}
TEL;TYPE=FAX:${formData.fax}
EMAIL:${formData.email}
ORG:${formData.company}
TITLE:${formData.job}
ADR;TYPE=WORK:;;${formData.street};${formData.city};${formData.state};${formData.zipcode};${formData.country}
URL:${formData.website}
END:VCARD`;

        setQRCode(vCardData);
        setShowQRCode(true);
    };

    const fields = {
        "Your Name": [
            { label: "First Name", name: "firstname", colSize: 6 },
            { label: "Last Name", name: "lastname", colSize: 6 }
        ],
        "Contact": [
            { label: "Mobile", name: "mobile", colSize: 12 },
            { label: "Phone", name: "phone", colSize: 6 },
            { label: "Fax", name: "fax", colSize: 6 }
        ],
        "Email": [
            { label: "Email", name: "email", colSize: 12 }
        ],
        "Company": [
            { label: "Company", name: "company", colSize: 6 },
            { label: "Your Job", name: "job", colSize: 6 }
        ],
        "Address": [
            { label: "Street", name: "street", colSize: 12 },
            { label: "City", name: "city", colSize: 6 },
            { label: "ZIP", name: "zipcode", colSize: 6 },
            { label: "State", name: "state", colSize: 6 },
            { label: "Country", name: "country", colSize: 6 }
        ],
        "Website": [
            { label: "Website", name: "website", colSize: 12 }
        ]
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-4">
            <div className="row justify-content-center" style={{ width: '100%', maxWidth: '1200px' }}>
                <div className="col-12 col-md-7" style={{
                    backgroundColor: '#ebebed',
                    padding: '20px',
                    borderRadius: '10px',
                    marginBottom: '15px',
                    marginRight: '15px', // Margin for spacing
                }}>
                    <h2 className="text-center mb-3">vCard QR Code Generator</h2>
                    <form className="vcard-form">
                        {Object.keys(fields).map((section, index) => (
                            <div key={index}>
                                <h6 className="mt-3">{section}</h6>
                                <div className="row">
                                    {fields[section].map((field, idx) => (
                                        <div key={idx} className={`form-group col-md-${field.colSize} mb-3`}>
                                            <input
                                                name={field.name}
                                                className="form-control"
                                                onChange={handleChange}
                                                placeholder={`${field.label}`}
                                            />
                                            {errors[field.name] && <span className="text-danger">{errors[field.name]}</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={handleGenerateQRCode} style={{ margin: '10px 0' }}>
                            Generate QR Code
                        </button>
                    </form>
                </div>

                {showQRCode && (
                    <div className="col-12 col-md-5 d-flex flex-column align-items-center qr-code-container " style={{
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid grey',
                        maxWidth: '180px',
                        height: '200px'
                    }}>
                        {qrcode && <QRCodeSVG value={qrcode} size={150} />}
                        <div className="scan-message bg-dark text-white text-center py-1 px-2 rounded mt-2">
                            Scan Me
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VCard;
