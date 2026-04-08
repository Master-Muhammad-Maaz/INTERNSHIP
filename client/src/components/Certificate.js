import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Certificate = () => {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        duration: '150 Hours',
        college: 'Shri Shivaji College Akola',
        tech: 'React Js',
        performance: 'Excellent'
    });

    const certRef = useRef();

    const generatePDF = async () => {
        const element = certRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${student.name}_Certificate.pdf`);
    };

    const inputStyle = { padding: '10px', margin: '5px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', padding: '40px' }}>
            {/* INPUT FORM */}
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <input style={inputStyle} type="text" placeholder="Student Name" onChange={(e) => setStudent({...student, name: e.target.value})} />
                <input style={inputStyle} type="text" placeholder="College Name" onChange={(e) => setStudent({...student, college: e.target.value})} />
                <button onClick={generatePDF} style={{ padding: '10px 20px', backgroundColor: '#E87C33', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Generate PDF
                </button>
            </div>

            {/* CERTIFICATE TEMPLATE */}
            <div ref={certRef} style={{ width: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '50px', border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ backgroundColor: '#E87C33', width: '50px', height: '50px', marginRight: '15px' }}></div>
                    <div>
                        <h2 style={{ color: '#E87C33', margin: 0 }}>WEBREICH TECHNOLOGIES</h2>
                        <small>(An IT Solutions & Software Development Company)</small>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ letterSpacing: '2px' }}>INTERNSHIP COMPLETION CERTIFICATE</p>
                    <p>This is to certify that</p>
                    <h1 style={{ fontSize: '42px', margin: '10px 0', borderBottom: '1px solid #eee', display: 'inline-block' }}>{student.name || "Student Name"}</h1>
                    <p>has successfully completed an internship with <b>WebReich Technologies</b> as a <b>Web Developer</b></p>
                </div>

                {/* DETAILS BLOCKS (As per your Image) */}
                <div style={{ marginTop: '30px' }}>
                    {[
                        { label: 'DURATION', value: student.duration },
                        { label: 'COLLEGE', value: student.college },
                        { label: 'TECHNOLOGIES', value: student.tech },
                        { label: 'PERFORMANCE', value: student.performance }
                    ].map((item, index) => (
                        <div key={index} style={{ border: '1px solid #e0e6ed', borderRadius: '15px', padding: '15px', marginBottom: '10px' }}>
                            <small style={{ color: '#888', display: 'block' }}>{item.label}</small>
                            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.value}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <p style={{ margin: 0 }}><b>For WebReich Technologies</b></p>
                        <div style={{ marginTop: '20px', borderTop: '1px solid #000', width: '150px' }}>
                            <small>Authorized Signatory</small>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                         <div style={{ width: '80px', height: '80px', border: '2px dashed #0056b3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <small style={{ color: '#0056b3', fontSize: '10px' }}>COMPANY SEAL</small>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
