import React from 'react';
import './SearchArea.css'; // Ensure this is correctly linked to your component

const SearchArea = ({ onSelectionChange }) => {



    return (
        <div className="search-area">
            <div className="dropdown-container">
                <select className="search-dropdown" onChange={(e) => onSelectionChange('Difficulty', e.target.value)}>
                    <option value="All">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Very Hard">Very Hard</option>

                </select>
                <select className="search-dropdown" onChange={(e) => onSelectionChange('Category', e.target.value)}>
                    <option value="All">All</option>
                    <option value="Situational">Situational</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Problem solving">Problem solving</option>
                    <option value="Background">Background</option>
                    <option value="Technical">Technical</option>
                    <option value="Value based">Value based</option>
                    <option value="Cultural fit">Cultural fit</option>

                </select>
                <select className="search-dropdown" onChange={(e) => onSelectionChange('JobType', e.target.value)}>
                    <option value="All">All</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Business analyst">Business analyst</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Customer success">Customer success</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Finance">Finance</option>
                    <option value="General">General</option>
                    <option value="Design">Design</option>
                    <option value="Hr">Hr</option>
                    <option value="Legal services">Legal services</option>
                    <option value="Data analyst">Data analyst</option>
                    <option value="Recruiting">Recruiting</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Product management">Product management</option>
                    <option value="Public relations">Public relations</option>
                    <option value="Quality assurance">Quality assurance</option>
                    <option value="Sales">Sales</option>
                    <option value="Software engineering">Software engineering</option>
                    <option value="Project management">Project management</option>
                    <option value="Other">Other</option>
                </select>
                <select className="search-dropdown" onChange={(e) => onSelectionChange('Companies', e.target.value)}>
                    <option value="All">All</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Accenture">Accenture</option>
                    <option value="Snapchat">Snapchat</option>
                    <option value="Dropbox">Dropbox</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Linkedin">Linkedin</option>
                    <option value="Netflix">Netflix</option>
                    <option value="Uber">Uber</option>
                    <option value="Salesforce">Salesforce</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Intel">Intel</option>
                    <option value="Oracle">Oracle</option>
                    <option value="Bank Of America">Bank Of America</option>
                    <option value="Sony">Sony</option>
                    <option value="Google">Google</option>
                    <option value="Nvidia">Nvidia</option>
                    <option value="Adobe">Adobe</option>
                    <option value="HSBC">HSBC</option>
                    <option value="Honeywell">Honeywell</option>
                    <option value="Deloitte">Deloitte</option>
                    <option value="Deutsche">Deutsche</option>
                    <option value="CVS">CVS</option>
                    <option value="McKesson">McKesson</option>
                    <option value="Verizon">Verizon</option>
                    <option value="Anthem">Anthem</option>
                    <option value="Apple">Apple</option>
                    <option value="Airbus">Airbus</option>
                    <option value="American Airlines">American Airlines</option>
                    <option value="Blue Origin">Blue Origin</option>
                    <option value="Fidelity">Fidelity</option>
                    <option value="Pfizer">Pfizer</option>
                    <option value="Cisco">Cisco</option>
                    <option value="Boeing">Boeing</option>
                    <option value="Hewlett Packard">Hewlett Packard</option>
                    <option value="Verizon">Verizon</option>
                    <option value="Comcast">Comcast</option>
                    <option value="Lockheed Martin">Lockheed Martin</option>
                    <option value="Visa">Visa</option>
                    <option value="Netflix">Netflix</option>
                    <option value="Square">Square</option>
                    <option value="Discord">Discord</option>
                    <option value="Walmart">Walmart</option>
                    <option value="Proctor & Gamble">Proctor & Gamble</option>
                    <option value="NVIDIA">NVIDIA</option>
                    <option value="Goldman Sachs">Goldman Sachs</option>
                    <option value="Bloomberg">Bloomberg</option>
                    <option value="AT&T">AT&T</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Indeed">Indeed</option>
                    <option value="JPMorgan Chase">JPMorgan Chase</option>
                    <option value="Delta">Delta</option>
                    <option value="Boeing">Boeing</option>
                    <option value="General Motors">General Motors</option>
                    <option value="General Electric">General Electric</option>
                    <option value="Abbvie">Abbvie</option>
                    <option value="Comcast">Comcast</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="HP Enterprise">HP Enterprise</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="CBS">CBS</option>
                    <option value="SpaceX">SpaceX</option>
                    <option value="Starbucks">Starbucks</option>
                    <option value="Ford">Ford</option>
                    <option value="Morgan Stanley">Morgan Stanley</option>
                    <option value="Costco">Costco</option>
                    <option value="Citizen Watch">Citizen Watch</option>
                    <option value="American Express">American Express</option>
                    <option value="Alaska Airlines">Alaska Airlines</option>
                    <option value="Expedia">Expedia</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Ebay">Ebay</option>
                    <option value="Target">Target</option>
                    <option value="Wells Fargo">Wells Fargo</option>
                    <option value="UPS">UPS</option>
                    <option value="Progressive">Progressive</option>
                    <option value="Pfizer">Pfizer</option>
                    <option value="AIG">AIG</option>
                    <option value="United Airlines">United Airlines</option>
                    <option value="Johnson & Johnson">Johnson & Johnson</option>
                    <option value="Delta Air Lines">Delta Air Lines</option>
                    <option value="United Healthcare">United Healthcare</option>
                    <option value="L3Harris">L3Harris</option>
                    <option value="Simon Consulting">Simon Consulting</option>
                    <option value="ServiceNow">ServiceNow</option>
                    <option value="Hewlett Packard">Hewlett Packard</option>
                    <option value="ByteDance">ByteDance</option>
                </select>
                <select className="search-dropdown" onChange={(e) => onSelectionChange('Other', e.target.value)}>
                    <option value="All">All</option>
                    <option value="Answered">Answered</option>
                    <option value="Not answered">Not answered</option>
                </select>
            </div>
        </div>
    );
};

export default SearchArea;
