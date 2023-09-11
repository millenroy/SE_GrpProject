
import background from "./tollPlaza2.png";
const IndexPage = () => {
  return(
    <div style={{ backgroundImage: `url(${background})`,
    height: '86.5vh', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
    <section style={{position: 'absolute',  top:'66%', backgroundColor: 'rgba(255, 255, 255, .5)'}}>
        <div style={{margin: '0 30px'}}>
            <div class="about">
                <div class="about-caption">
                    <h2 class="section-title mb-3">About Us</h2>
                    <p>
                        The National Highways Authority of India (NHAI) was constituted by an Act of Parliament, the National Highways Authority of India Act, 1988. It is responsible for the development, maintenance and management of National Highways entrusted to it and/or matters connected or incidental thereto. NHAI enters into Concession Agreements for design, construction, operation and maintenance of highways by DBFOT Concessionaires.
                    </p>
                </div>              
            </div>
        </div>
    </section>
    <section  style={{position: 'absolute',  top:'84%', backgroundColor: 'rgba(255, 255, 255, .5)'}}>
  <div style={{margin: '0 30px'}}>
      <div class="about">
          <div class="about-caption">
              <h2 class="section-title mb-3">Contact Us</h2>
              <p>
                BY PHONE
                (Monday to Friday, 9am to 6pm PST)
                West Bengal Toll-Free:
                +919932240669
                
                International:
                1-604-637-0780

                TollPlaza.com Solutions Inc.

                P.O. Box 43083 Cascade
                Burnaby, BC V5G 4S2
                Canada.
                P.O. Box 43083
                Burnaby, BC V5G 4S2
                Canada.
              </p>
          </div>
      </div>
  </div>
</section>
  </div>
  )
}
export default IndexPage;