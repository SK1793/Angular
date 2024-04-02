using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SampleApi.Models
{
    public class UserDetails
    {
        [Key]
        public int UserId { get; set; }

        [Column(TypeName = "VarChar(120)")]
        public string UserName { get; set; } = "";

        [Column(TypeName = "VarChar(30)")]
        public string UserPassword { get; set; } = "";

        [Column(TypeName="Varchar(30)")]
        public string UserMail { get; set; } = "";

        [Column(TypeName="Varchar(1)")]
        //M-Male , W-Women , O-Other
        public string UserGender { get; set; } = "";

        [Column(TypeName ="VarChar(8)")]
        //dd-mm-yyyy
        public string UserDob { get; set; } = "";
    }
    
}

