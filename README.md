# PRUEBA_TIA
 Prueba tecnica de TIA

Backend (SpringBoot): Realizar los siguientes cambios en el documento application.properties
spring.application.name=TIA_Prueba  
  
  
spring.datasource.url=jdbc:mysql://{direccionIP}:{PuertodeMYSQL}/PRUEBA_TECNICA_TIA?useSSL=false&serverTimezone=UTC  
spring.datasource.username={UsusariodeMYSQL}  
spring.datasource.password={ClavedeMYSQL}  
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  
  
spring.security.enabled=false

Frontend: Crear un .env en la raíz con los siguientes campos 
VITE_API_BASE_URL= http://{DireccionIP}:{PuertodeSpringboot}