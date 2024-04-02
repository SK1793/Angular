using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SampleApi.Models

{
    public class NotesDetails
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("UserId")]
        [Column(TypeName ="Int")]
        public int UserId { get; set; }

        [Column(TypeName ="VarChar(250)")]
        public string UserMessage { get; set; }

        [Column(TypeName ="VarChar(50)")]
        public string UserTitle { get; set; }
    }
}
