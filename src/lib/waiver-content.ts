export type Language = 'en' | 'es' | 'zh';

export interface WaiverContent {
  title: string;
  logoText1: string;
  logoSubtext: string;
  intro: string;
  points: string[];
  subPoints: string[];
  volunteerClause: string;
  indemnifyClause: string;
  releaseClause: string;
  finalAgreement: string;
  agreementCheck: string;
  printNameLabel: string;
  signatureLabel: string;
  dateLabel: string;
  submitButton: string;
  switchButton: string;
  successMessage: string;
  signaturePlaceholder: string;
  clearSignature: string;
  signatureCaptured: string;
  signatureHint: string;
  submitAnother: string;
  requiredField: string;
  pleaseSign: string;
  pleaseAgree: string;
}

export const waiverContent: Record<Language, WaiverContent> = {
  en: {
    title: "BICYCLE PROGRAM WAIVER AND RELEASE FROM LIABILITY",
    logoText1: "HOPE'S CORNER",
    logoSubtext: "SHARING MEALS, BUILDING COMMUNITY",
    intro: "I expressly assume and accept any and all risk of injury or death to myself or others arising from my use of the Hope's Corner, Inc. Bicycle Program including repair services, transportation equipment such as bicycles, scooters, skateboards, etc. and all equipment and supplies. This waiver and release from liability includes any and all repair services, equipment, including but not limited to, the bicycle, helmet, lock, light, rack, basket, tubes, tires, chains, brakes, and my participation in the Program.",
    points: [
      "I am a voluntary participant and utilize the program services and equipment at my own risk.",
      "I am responsible for maintaining the bicycle in good condition. I will inspect the bicycle prior to use to ensure all parts are in proper working condition.",
      "I understand that there are risks inherent in riding a bicycle even when the bicycle and equipment are in good working order and used properly. Injuries are a common, ordinary and foreseeable consequence of bicycle riding. I understand that the risks I may encounter include, but are not limited to the following:",
    ],
    subPoints: [
      "The equipment may break or malfunction, causing loss of or damage to property or injury to my person or to another person.",
      "Riding a bicycle requires physical exertion and may result in discomfort, pain or injury.",
      "I might encounter hazards while riding which could cause me to fall or be propelled.",
      "Bicycle travel is dangerous. I may be injured by many factors over which I have no control.",
    ],
    volunteerClause: "I understand that I assume the risk of any damage or failure of equipment arising from repair work or services donated to me by the Bicycle Program volunteers, employees or vendors. I understand the program volunteers and employees are not trained or licensed professionals and cannot be held responsible for damage to my equipment. I am responsible for inspecting the work and not utilizing the bicycle or equipment if it is not in good working order.",
    indemnifyClause: "I agree to indemnify, defend, save and hold harmless Hope's Corner, Inc. including all employees, volunteers, directors, officers, vendors and funders of the program from any claims, losses, damages or liability accruing or resulting to any person or entity from my participation in the Bicycle Program or use of the bicycle, bicycle equipment and bicycle repair services.",
    releaseClause: "I, on behalf of myself, my heirs, successors and assigns, hereby waive, release and forever discharge Hope's Corner, Inc. including all employees, volunteers, directors, officers, vendors and funders of the program from any and all claims, losses, damages or liability accruing or resulting to any person or entity from my participation in the Bicycle Program or use of the bicycle, bicycle equipment and repair services.",
    finalAgreement: "I AM AWARE THAT THIS IS A RELEASE OF LIABILITY. I AM SIGNING IT FREELY AND OF MY OWN ACCORD AND I RECOGNIZE AND AGREE THAT IT IS BINDING UPON MYSELF, MY HEIRS AND ASSIGNS, AND IN THE EVENT THAT I AM SIGNING IT ON BEHALF OF ANY MINORS, I HAVE FULL LEGAL AUTHORITY TO DO SO, AND REALIZE THE BINDING EFFECT OF THIS CONTRACT ON THEM, AS WELL AS ON MYSELF. I AGREE TO ALLOW HOPE'S CORNER, INC. TO USE PHOTOGRAPHS, VIDEOS, OR SOUND RECORDINGS OF ME FOR PROMOTIONAL AND PUBLICITY PURPOSES.",
    agreementCheck: "I have carefully read this agreement and understand that this is a release of liability. I agree to the terms and conditions.",
    printNameLabel: "Print Full Name",
    signatureLabel: "Signature (Draw below)",
    dateLabel: "Date",
    submitButton: "Submit Waiver",
    switchButton: "Español | 中文",
    successMessage: "Thank you! Your waiver has been submitted successfully.",
    signaturePlaceholder: "Type your signature here or upload an image",
    clearSignature: "Clear Signature",
    signatureCaptured: "Signature captured",
    signatureHint: "Sign here with your finger or mouse • Use landscape mode on mobile for best experience",
    submitAnother: "Submit Another Waiver",
    requiredField: "This field is required",
    pleaseSign: "Please provide your signature",
    pleaseAgree: "Please agree to the terms and conditions",
  },
  es: {
    title: "PROGRAMA DE BICICLETAS ACUERDO DE RENUNCIA Y EXENCIÓN DE RESPONSABILIDAD",
    logoText1: "HOPE'S CORNER",
    logoSubtext: "COMPARTIR COMIDAS, CONSTRUYENDO COMUNIDAD",
    intro: "Asumo y acepto expresamente todos y cada uno de los riesgos de lesiones o muerte para mí u otros que surjan de mi uso del Programa de Bicicletas de Hope's Corner, Inc., incluidos los servicios de reparación, equipos de transporte como bicicletas, scooters, patinetas, etc., y todo el equipo y los suministros. Esta renuncia y exención de responsabilidad incluye todos y cada uno de los servicios de reparación, equipos, incluidos, entre otros, la bicicleta, el casco, el candado, la luz, el portabultos, la canasta, las cámaras, los neumáticos, las cadenas, los frenos y mi participación en el Programa.",
    points: [
      "Soy un participante voluntario y utilizo los servicios y el equipo del programa bajo mi propio riesgo.",
      "Soy responsable de mantener la bicicleta en buenas condiciones. Inspeccionaré la bicicleta antes de usarla para asegurarme de que todas las piezas estén en condiciones de funcionamiento adecuadas.",
      "Entiendo que existen riesgos inherentes al andar en bicicleta incluso cuando la bicicleta y el equipo están en buen estado de funcionamiento y se utilizan correctamente. Las lesiones son una consecuencia común, ordinaria y previsible de andar en bicicleta. Entiendo que los riesgos que puedo encontrar incluyen, entre otros, los siguientes:",
    ],
    subPoints: [
      "El equipo puede romperse o funcionar mal, causando pérdidas o daños a la propiedad o lesiones a mi persona o a otra persona.",
      "Andar en bicicleta requiere esfuerzo físico y puede provocar molestias, dolor o lesiones.",
      "Podría encontrar peligros mientras conduzco que podrían hacer que me caiga o sea impulsado.",
      "Viajar en bicicleta es peligroso. Puedo resultar herido por muchos factores sobre los que no tengo control.",
    ],
    volunteerClause: "Entiendo que asumo el riesgo de cualquier daño o falla del equipo que surja del trabajo de reparación o los servicios que me donen los voluntarios, empleados o proveedores del Programa de Bicicletas. Entiendo que los voluntarios y empleados del programa no son profesionales capacitados o con licencia y no se les puede hacer responsables de los daños a mi equipo. Soy responsable de inspeccionar el trabajo y no utilizar la bicicleta o el equipo si no está en buen estado de funcionamiento.",
    indemnifyClause: "Acepto indemnizar, defender, salvar y mantener indemne a Hope's Corner, Inc., incluidos todos los empleados, voluntarios, directores, funcionarios, proveedores y financiadores del programa de cualquier reclamo, pérdida, daño o responsabilidad que se acumule o resulte para cualquier persona o entidad de mi participación en el Programa de Bicicletas o el uso de la bicicleta, el equipo de la bicicleta y los servicios de reparación de bicicletas.",
    releaseClause: "Yo, en mi nombre, mis herederos, sucesores y cesionarios, por la presente renuncio, libero y descargo para siempre a Hope's Corner, Inc., incluidos todos los empleados, voluntarios, directores, funcionarios, proveedores y financiadores del programa de cualquier y todos los reclamos, pérdidas, daños o responsabilidad que se acumulen o resulten para cualquier persona o entidad de mi participación en el Programa de Bicicletas o el uso de la bicicleta, el equipo de la bicicleta y los servicios de reparación.",
    finalAgreement: "SOY CONSCIENTE DE QUE ESTA ES UNA EXENCIÓN DE RESPONSABILIDAD. LO FIRMO LIBREMENTE Y POR MI PROPIA VOLUNTAD Y RECONOZCO Y ACEPTO QUE ES VINCULANTE PARA MÍ, MIS HEREDEROS Y CESIONARIOS, Y EN CASO DE QUE LO FIRME EN NOMBRE DE MENORES, TENGO PLENA AUTORIDAD LEGAL PARA HACERLO, Y ME DOY CUENTA DEL EFECTO VINCULANTE DE ESTE CONTRATO SOBRE ELLOS, ASÍ COMO SOBRE MÍ. ACEPTO PERMITIR QUE HOPE'S CORNER, INC. UTILICE FOTOGRAFÍAS, VIDEOS O GRABACIONES DE SONIDO DE MÍ PARA FINES PROMOCIONALES Y PUBLICITARIOS.",
    agreementCheck: "He leído atentamente este acuerdo y entiendo que se trata de una exención de responsabilidad. Acepto los términos y condiciones.",
    printNameLabel: "Escriba el Nombre Completo",
    signatureLabel: "Firma (Dibuje abajo)",
    dateLabel: "Fecha",
    submitButton: "Enviar Renuncia",
    switchButton: "English | 中文",
    successMessage: "¡Gracias! Su renuncia ha sido enviada con éxito.",
    signaturePlaceholder: "Escriba su firma aquí o suba una imagen",
    clearSignature: "Borrar Firma",
    signatureCaptured: "Firma capturada",
    signatureHint: "Firme aquí con su dedo o ratón • Use el modo horizontal en dispositivos móviles para una mejor experiencia",
    submitAnother: "Enviar Otra Renuncia",
    requiredField: "Este campo es obligatorio",
    pleaseSign: "Por favor proporcione su firma",
    pleaseAgree: "Por favor acepte los términos y condiciones",
  },
  zh: {
    title: "自行车项目弃权和免责书",
    logoText1: "希望之角",
    logoSubtext: "共享美食，共建社区",
    intro: "我明确承担并接受因使用希望之角公司自行车项目（包括维修服务、自行车、滑板车、滑板等交通设备以及所有设备和用品）而对我自己或他人造成的任何和所有伤害或死亡风险。本弃权和免责书包括任何和所有维修服务、设备，包括但不限于自行车、头盔、锁、灯、货架、篮子、内胎、轮胎、链条、制动器，以及我对该项目的参与。",
    points: [
      "我是自愿参与者，自行承担使用项目服务和设备的风险。",
      "我有责任保持自行车处于良好状态。我将在使用前检查自行车，确保所有部件都处于正常工作状态。",
      "我理解骑自行车存在固有风险，即使自行车和设备处于良好工作状态并正确使用。伤害是骑自行车的常见、普通和可预见的后果。我理解可能遇到的风险包括但不限于以下内容：",
    ],
    subPoints: [
      "设备可能损坏或故障，造成财产损失或损害，或对我本人或他人造成伤害。",
      "骑自行车需要体力消耗，可能导致不适、疼痛或受伤。",
      "我可能在骑行时遇到危险，这可能导致我跌倒或被推动。",
      "自行车出行是危险的。我可能因许多我无法控制的因素而受伤。",
    ],
    volunteerClause: "我理解我承担因自行车项目志愿者、员工或供应商为我提供的维修工作或服务而导致的任何设备损坏或故障的风险。我理解项目志愿者和员工不是经过培训或持有执照的专业人员，不能对我的设备损坏负责。我有责任检查工作，如果自行车或设备未处于良好工作状态，则不使用它们。",
    indemnifyClause: "我同意赔偿、辩护、拯救并使希望之角公司（包括项目的所有员工、志愿者、董事、管理人员、供应商和资助者）免受因我参与自行车项目或使用自行车、自行车设备和自行车维修服务而对任何个人或实体产生或导致的任何索赔、损失、损害或责任的损害。",
    releaseClause: "我代表我本人、我的继承人、继任者和受让人，在此放弃、免除并永远解除希望之角公司（包括项目的所有员工、志愿者、董事、管理人员、供应商和资助者）因我参与自行车项目或使用自行车、自行车设备和自行车维修服务而对任何个人或实体产生或导致的任何和所有索赔、损失、损害或责任。",
    finalAgreement: "我知道这是一份免责书。我是自由和自愿签署的，我认识并同意它对我本人、我的继承人和受让人具有约束力，如果我代表任何未成年人签署，我有充分的法律权力这样做，并意识到本合同对他们以及对我的约束效力。我同意允许希望之角公司将我的照片、视频或录音用于宣传和宣传目的。",
    agreementCheck: "我已仔细阅读本协议，并理解这是一份免责书。我同意条款和条件。",
    printNameLabel: "打印全名",
    signatureLabel: "签名（请在下方签名）",
    dateLabel: "日期",
    submitButton: "提交弃权书",
    switchButton: "English | Español",
    successMessage: "谢谢！您的弃权书已成功提交。",
    signaturePlaceholder: "在此输入您的签名或上传图片",
    clearSignature: "清除签名",
    signatureCaptured: "签名已捕获",
    signatureHint: "用手指或鼠标在此签名 • 在移动设备上使用横屏模式获得最佳体验",
    submitAnother: "提交另一份弃权书",
    requiredField: "此字段为必填项",
    pleaseSign: "请提供您的签名",
    pleaseAgree: "请同意条款和条件",
  },
};

export const getNextLanguage = (current: Language): Language => {
  const languages: Language[] = ['en', 'es', 'zh'];
  const currentIndex = languages.indexOf(current);
  return languages[(currentIndex + 1) % languages.length];
};
